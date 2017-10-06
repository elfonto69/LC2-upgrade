<?php
/*
* ReportController.php - Controller file
*
* This file is part of the Report component.
*-----------------------------------------------------------------------------*/

namespace App\Yantrana\Components\Report\Controllers;

use App\Yantrana\Support\CommonPostRequest as Request;
use App\Yantrana\Core\BaseController;
use App\Yantrana\Components\Report\ReportEngine;
use Auth;

use DB;
use App\Quotation;

class ReportController extends BaseController
{
    /**
     * @var ReportEngine - Report Engine
     */
    protected $reportEngine;

    /**
     * Constructor.
     *
     * @param ReportEngine $reportEngine - Report Engine
     *-----------------------------------------------------------------------*/
    public function __construct(ReportEngine $reportEngine)
    {
        $this->reportEngine = $reportEngine;
    }

    /**
     * Handle report list datatable source.
     *
     * @param int $startDate
     * @param int $endDate
     * @param int $status
     *
     * @return json
     *---------------------------------------------------------------- */
    public function index($startDate, $endDate, $status, $order)
    {
        $engineReaction = $this->reportEngine
                               ->prepareList($startDate, $endDate, $status, $order);

        $userRole = Auth::user()->role;

        $requireColumns = [

            'creation_date' => function ($key) {
                return formatStoreDateTime($key['created_at']);
            },
            'formated_status' => function ($key) {
                return $this->findStatus($key['status']);
            },
            'formated_name' => function ($key) {
                return $key['fname'].' '.$key['lname'];
            },
            'totalAmount' => function ($key) {
                return orderPriceFormat($key['total_amount'], $key['currency_code']);
            },
            'pfdDownloadURL' => function ($key) {
                return route('report.pdf_download', $key['_id']);
            }, '_id', 'status', 'users_id', 'order_uid', 'fname', 'payment_status',
        ];

        // Generate excel download URL
        $excelDownloadURL = route('report.excel_download', [$startDate, $endDate, $status, $order]);

        // Get total amount by currency code
        $totalAmounts = $this->reportEngine
                             ->getTotalAmountByCurrency($startDate, $endDate);

        return __dataTable($engineReaction, $requireColumns, [
                'excelDownloadURL' => $excelDownloadURL,
                'duration' => config('__tech.report_duration'),
                'totalAmounts' => $totalAmounts,
            ]);
    }

    /**
     * return mathching status.
     *
     * @param int $ID
     *
     * @return string
     *---------------------------------------------------------------- */
    public function findStatus($ID)
    {
        // Get orders status code
        $status = config('__tech.orders.status_codes');

        return $status[$ID];
    }

    /**
     * order detail dialog.
     *
     * @param int $orderID
     *
     * @return json object
     *---------------------------------------------------------------- */
    public function orderDetailsSupportData($orderID)
    {
        $processReaction = $this->reportEngine
                                ->prepareOrderDetailsDialogData($orderID);

       // get engine reaction
        return __processResponse($processReaction, [
                    18 => __('Order does not exist.'),
                ], $processReaction['data']);
    }

    /**
     * download pdf.
     *
     * @param int $orderID
     *
     * @return json object
     *---------------------------------------------------------------- */
    public function pdfDownload(Request $request, $orderID)
    {
        return  $this->reportEngine->processPdfDownload($orderID);
    }

    /**
     * download excel.
     *
     * @param int $startDate
     * @param int $endDate
     * @param int $status
     *
     * @return json object
     *---------------------------------------------------------------- */
    public function excelDownload($startDate, $endDate, $status, $order)
    {
        return  $this->reportEngine->processExcelDownload($startDate, $endDate, $status, $order);
    }

    /**
     * get report config items excel.
     *
     * @return json object
     *---------------------------------------------------------------- */
    public function orderConfigItems()
    {
        $config = Config('__tech.orders');

        // get engine reaction
        return __apiResponse([
                'orderConfigStatusItems' => $config['status_codes'],
                'orderConfigDateItems' => $config['date_filter_code'],
            ]);
    }
    
    public function getQuickOrder()
    {
        
    
          // $quickOrders['orders'] = DB::table('qorders')->select("*")->get();
            $quickOrders['orders'] = DB::table('qorders')->select('qorders.*', 'products.name as p_name')->join('products', 'qorders.product_id', '=', 'products.product_id')->orderBy('created_at', 'desc')->get();
           return view('quick_order.list', $quickOrders);

           //return $this->loadPublicView('quick_order.list',  $quickOrders);
    }
    
    public function getSingleQuickOrder($id)
    {
        
    
        
         $order = DB::table('qorders')
             ->select("id", "name", "phone", "address")
             ->where('id', '=', $id)->get();
            echo  json_encode($order);
    }
    
    public function updateQuickOrder(Request $request)
    {
        DB::table('qorders')
            ->where('id', $request->input('order_id'))
            ->update(
                ['name' => $request->input('fullName'), 'phone' => $request->input('phone'),'address' => $request->input('address') ]
            );
             
        $resp['status'] = true;
        $resp['msg'] = "Order updated successfully";
        echo json_encode($resp);
    }
    
    public function deleteQuickOrder($id)
    {
        DB::table('qorders')->where('id', '=', $id)->delete();
        $resp['status'] = true;
        $resp['msg'] = "Order deleted successfully";
        echo json_encode($resp);
    }
}

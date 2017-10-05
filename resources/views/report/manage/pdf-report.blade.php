<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
 "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    <head>
        <style type="text/css">
            #page-wrap {
                width: 700px;
                margin: 0 auto;
            }
            .center-justified {
                text-align: justify;
                margin: 0 auto;
                width: 30em;
            }
            table.outline-table {
                border: 1px solid;
                border-spacing: 0;
            }
            tr.border-bottom td, td.border-bottom {
                border-bottom: 1px solid;
            }
            tr.border-top td, td.border-top {
                border-top: 1px solid;
            }
            td.border-thin {
                border-top: 1px;
            }
            tr.border-right td, td.border-right {
                border-right: 1px solid;
            }
            tr.border-right td:last-child {
                border-right: 0px;
            }
            tr.center td, td.center {
                text-align: center;
                vertical-align: text-top;
            }
            td.pad-left {
                padding-left: 5px;
            }
            tr.right-center td, td.right-center {
                text-align: right;
                padding-right: 50px;
            }
            tr.right td, td.right {
                text-align: right;
            }
            .grey {
                background:grey;
            }

            div.lw-footer {
                position: fixed;
                width: 100%;
                border: 0px solid #888;
                overflow: hidden;
                padding: 0.1cm;
            }
            div.lw-footer {
                padding-top: 35px;
                padding-bottom: 10px;
                bottom: 10px;
                left: 20px;
                right: 20px;
                border-top-width: 1px;
                height: 0.5cm;
            }

            .lw-pdf-page-number {
              text-align: left;
              font-size: 12px;
            }
            
            .lw-pdf-page-number:before {
              content: counter(page);
            }

            hr {
              page-break-after: always;
              border: 0;
            }

            span.lw-horizantal-line {
                height: 30px;
                border-style: solid;
                border-color: black;
                border-width: 1px 0 0 0;
                border-radius: 20px;
            }
            span.lw-horizantal-line:before { /* Not really supposed to work, but does */
                display: block;
                content: "";
                height: 30px;
                margin-top: -31px;
                border-style: solid;
                border-color: black;
                border-width: 0 0 1px 0;
                border-radius: 20px;
            }

        </style>
    </head>
    <body>
	    <div id="page-wrap">

            <div style="text-align: center;">
                <h1 >Order Invoice</h1> <i> <?=  $orderDetails['currentDateTime']  ?></i>
            </div>

            <table width="100%">
                <tbody>
                    <tr>
                        <td width="30%">
                            <span style="background: #<?=  getStoreSettings('logo_background_color')  ?>"><img src="<?=  getStoreSettings('logo_image')  ?>"></span> <!-- your logo here -->
                        </td>
                        <td width="70%">
                            <strong>Store Name:</strong><?=  getStoreSettings('store_name')  ?><br>
                            <strong>Address:</strong><?=  getStoreSettings('contact_address')  ?><br>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br>
            <span class="lw-horizantal-line"></span>
            <br>
            @if ($orderDetails['data']['order']['paymentCompletedOn'])
            <div style="color: green;text-align:center;">
                <strong><i>Payment paid on <?= $orderDetails['data']['order']['paymentCompletedOn'] ?></i></strong>
            </div>
            @endif

            <table width="100%" class="table">
                <tbody>
                    <tr>
                        <td width="40%"><strong>Customer Info</strong></td>
                        <td width="40%"><strong>Order</strong></td>
                        <td width="20%"><strong>Payment</strong></td>
                    </tr>
                    <tr >
                        <td>Name : <?=  $orderDetails['data']['user']['fullName']  ?></td>
                        <td>ID: <?=  $orderDetails['data']['order']['orderUID']  ?></td>
                        <td>Method: <?=  $orderDetails['data']['order']['formatedPaymentMethod']  ?></td>
                    </tr>
                    <tr >
                        <td>Email: <?=  $orderDetails['data']['user']['email']  ?></td>
                        <td>Placed on : <?=  $orderDetails['data']['order']['formatedOrderPlacedOn']  ?></td>
                        <td>Status: <?=  $orderDetails['data']['order']['formatedPaymentStatus']  ?></td>
                    </tr>
                </tbody>
            </table>

            <table width="100%" class="outline-table">
                <tbody>
                    <tr class="border-bottom border-right center">
                        <td width="45%"><strong>Shipping Address</strong></td>
                        <td width="45%"><strong>Billing Address</strong></td>
                    </tr>
                    <tr class="border-right">
                        <td width="45%" class="pad-left">
                            <!--  shipping address  -->
                            @if(!empty($orderDetails['data']['address']['shippingAddress']))
                                <?=  $orderDetails['data']['address']['shippingAddress']['type']  ?><br>
                                <?=  $orderDetails['data']['address']['shippingAddress']['addressLine1']  ?><br>
                                <?=  $orderDetails['data']['address']['shippingAddress']['addressLine2']  ?><br>
                                City :
                                <?=  $orderDetails['data']['address']['shippingAddress']['city']  ?><br>
                                State :
                                <?=  $orderDetails['data']['address']['shippingAddress']['state']  ?><br>
                                Country :
                                <?=  $orderDetails['data']['address']['shippingAddress']['country']  ?><br>
                                Pin Code :
                                <?=  $orderDetails['data']['address']['shippingAddress']['pinCode']  ?><br><br>
                            @endif
                            <!--  /shipping address  -->
                        </td>
                        <td width="45%" class="pad-left">
                            
                            @if($orderDetails['data']['address']['sameAddress'] == true)
                                Same as Shipping Address
                            @endif

                            @if(!empty($orderDetails['data']['address']['billingAddress']) and $orderDetails['data']['address']['sameAddress'] == false)
                                <?=  $orderDetails['data']['address']['billingAddress']['type']  ?><br>
                                <?=  $orderDetails['data']['address']['billingAddress']['addressLine1']  ?><br>
                                <?=  $orderDetails['data']['address']['billingAddress']['addressLine2']  ?><br>
                                City :
                                <?=  $orderDetails['data']['address']['billingAddress']['city']  ?><br>
                                State :
                                <?=  $orderDetails['data']['address']['billingAddress']['state']  ?><br>
                                Country :
                                <?=  $orderDetails['data']['address']['billingAddress']['country']  ?><br>
                                Pin Code :
                                <?=  $orderDetails['data']['address']['billingAddress']['pinCode']  ?><br><br>
                            @endif
                            <!--  /billing address  -->
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <p>&nbsp;</p>

            <table width="100%" class="outline-table">
                <tbody>
                    <tr class="border-bottom border-right grey">
                        <td colspan="5"><strong>Products</strong></td>
                    </tr>
                    <tr class="border-bottom border-right center">
                        <td width="10%"><strong>Sr. No.</strong></td>
                        <td width="30%"><strong>Item Description</strong></td>
                        <td width="7%"><strong>Qty</strong></td>
                        <td width="20%"><strong>Price</strong></td>
                        <td width="20%"><strong>Subtotal</strong></td>
                    </tr>

                    <?php
                        $i = 1;
                    ?>
                    @if(!empty($orderDetails['data']['orderProducts']['products']))
                        @foreach($orderDetails['data']['orderProducts']['products'] as $product)
                    <tr class="border-right">
                        <td class="center" width="10%"><?=  $i  ?></td>
                        <td class="pad-left" width="30%">
                        <!--  product name, option and addon price  -->
                            <span><?=  $product['productName']  ?></span><br>
                            @if(!empty($product['option']))
                                @foreach($product['option'] as $option)
                                <div>
                                    <span><?=  $option['optionName']  ?></span><br>
                                    <span><?=  $option['valueName']  ?></span>
                                    <span>(<?=  $option['formatedOptionPrice']  ?>)</span>
                                </div>
                                @endforeach
                            @endif
                        </td>
                        <!--  /product name, option and addon price  -->

                        <!--  qty, price and total  -->
                        <td width="7%" class="center"><?=  $product['quantity']  ?></td>
                        <td width="20%" class="right"><?=  $product['formatedProductPrice']  ?></td>
                        <td width="20%" class="right"><?=  $product['formatedTotal']  ?></td>
                        <!--  /qty, price and total  -->
                    </tr>
                        <?php
                            $i++;
                        ?>
                        @endforeach
                    @endif
                    <tr class="border-top border-right">
                        <td colspan="4" class="right"><strong>Cart Total</strong></td>
                        <td class="right"><?=  $orderDetails['data']['orderProducts']['formatedSubtotal']  ?>
                        <?=  $orderDetails['data']['order']['currencyCode']  ?></td>
                    </tr>
                    @if (!empty($orderDetails['data']['coupon']))  
                    <tr class="border-top border-right">
                        <td colspan="4" class="right"><strong>Discount</strong></td>
                        <td class="right">- <?=  $orderDetails['data']['order']['formatedOrderDiscount']  ?></td>
                    </tr>
                    @endif

                    @if (!empty($orderDetails['data']['taxes']))  
                    @foreach($orderDetails['data']['taxes'] as $tax)      
                    <tr class="border-top border-right">
                        <td colspan="4" class="right"><strong>Tax <small>( <i><?= $tax['label'] ?></i> )</small> </strong></td>
                        <td class="right">
                            + <?=  $tax['formatedTaxAmount']  ?>
                        </td>
                    </tr>
                    @endforeach
                    @endif
                    <tr class="border-top border-right">
                        <td colspan="4" class="right"><strong>Shipping</strong></td>
                        <td class="right">
                            @if(!__isEmpty( $orderDetails['data']['order']['shippingAmount']))
                                + <?=  $orderDetails['data']['order']['formatedShippingAmount']  ?>
                            @else
                                <?= 'Free' ?>
                            @endif
                        </td>
                    </tr>
                    <tr class="border-top border-right">
                        <td colspan="4" class="right"><strong>Total Paid Amount</small> </strong></td>
                        <td class="right"><?=  $orderDetails['data']['order']['formatedTotalOrderAmount']  ?>
                        </td>
                    </tr>

                </tbody>
            </table>
            @if (!empty($orderDetails['data']['coupon']))  
            <p>&nbsp;</p>
            <table width="100%" class="outline-table">
                <tbody>
                    <tr class="border-bottom border-right grey">
                        <td colspan="2"><strong>Discount-</strong> <small>Information</small></td>
                    </tr>
                    <tr class="border-bottom border-right center">
                        <td width="40%"><strong>Description</strong></td>
                        <td width="25%"><strong>Info</strong></td>
                    </tr>
                    <tr class="border-right">
                        <td class="center">
                            @if($orderDetails['data']['coupon']['description'])
                            <?= $orderDetails['data']['coupon']['description'] ?>
                            @else
                                - 
                            @endif
                        </td>
                        <td>
                            <span>
                                Code : <?=  $orderDetails['data']['coupon']['code']  ?><br>
                            </span>
                            <span>
                                Title : <?=  $orderDetails['data']['coupon']['title']  ?><br>
                            </span>
                        </td>
                    </tr>
                    <tr class="border-right">
                        <td class="right border-top">Amount</td>
                        <td class="right border-top"> - <?=  $orderDetails['data']['order']['formatedOrderDiscount']  ?></td>
                    </tr>
                </tbody>
            </table>
            @endif
            
            
            @if(!empty($orderDetails['data']['taxes']))
            <p>&nbsp;</p>
            <table width="100%" class="outline-table">
                <tbody>
                    <tr class="border-bottom border-right grey">
                        <td colspan="2"><strong>Tax -</strong> <small>Information</small></td>
                    </tr>
                    <tr class="border-bottom border-right center">
                        <td width="40%"><strong>Description</strong></td>
                        <td width="25%"><strong>Info</strong></td>
                    </tr>
                    @foreach($orderDetails['data']['taxes'] as $tax)
                    <tr class="border-right">
                        <td class="center">
                            @if($tax['notes'] )
                            <?= $tax['notes'] ?>
                            @else
                                - 
                            @endif
                        </td>
                        <td>
                            <span>
                                Label : <?=  $tax['label']   ?><br>
                            </span>
                        </td>
                    </tr>
                    <tr class="border-right">
                        <td class="right border-top">Amount</td>
                        <td class="right border-top"> <?=  $tax['formatedTaxAmount']  ?></td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
            @endif
            
            <div class="lw-footer">
              <div  class="lw-pdf-page-number"> / Page</div>
            </div>

        </div> 


	   
    </body>
</html>
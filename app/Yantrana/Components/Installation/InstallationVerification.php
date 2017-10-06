<?php
/*
* InstallationVerification.php - Controller file
*-----------------------------------------------------------------------------*/

namespace App\Yantrana\Components\Installation;

use DB;
use Exception;
use Schema;
use App\Http\Controllers\Controller;

class InstallationVerification extends Controller
{

    protected $projectName = 'LivelyCart 2.3.x';
    protected $problems = [];
    protected $requirements = [
        'php_version' => '5.5.9',
        'mysql_version' => '5.0.0',
        'extensions' => [
            'Fileinfo' => '*',
            'OpenSSL' => '*',
            'PDO' => '*',
            'Mbstring' => '*',
            'Tokenizer' => '*',
            'GD' => '*',
            'Curl' => '*',
            'JSON' => '*'
        ],
        'user_table' => 'users',
        'user_find' => [
            'role' => 1
        ],
        'sql_file' => 'livelycart_2.sql',
        'tables' => [
            'activity_logs' => '*',
            'addresses' => '*',
            'brands' => '*',
            'categories' => '*',
            'countries' => '*',
            'coupons' => '*',
            'login_attempts' => '*',
            'ordered_products' => '*',
            'ordered_product_options' => '*',
            'orders' => '*',
            'order_logs' => '*',
            'order_payments' => '*',
            'order_taxes' => '*',
            'pages' => '*',
            'password_resets' => '*',
            'products' => '*',
            'product_categories' => '*',
            'product_images' => '*',
            'product_option_labels' => '*',
            'product_option_values' => '*',
            'product_specifications' => '*',
            'related_products' => '*',
            'settings' => '*',
            'shipping' => '*',
            'tax' => '*',
            'temp_emails' => '*',
            'users' => '*'
        ]
    ];

    protected $styleLines = "padding:8px; border-bottom:1px dotted #ddd;";

    /**
     * Constructor.
     *
     *-----------------------------------------------------------------------*/
    public function __construct()
    {
    }

    /**
     * Verify the installation
     *
     * @return void
     *---------------------------------------------------------------- */
    public function verify()
    {
        if (! file_exists('verify-install.php')) {
            abort(404);
        }

            echo '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>'.$this->projectName.' Installation Verification</title></head><body style="text-align:center;">';

            echo "<h2>".$this->projectName." Installation Verification!!</h2>";

        if (version_compare(PHP_VERSION, $this->requirements['php_version']) >= 0) {
            echo "<div style='$this->styleLines'>✓ <strong style='color:green'>PHP</strong> version is OK</div>";
        } else {
            echo "<div style='$this->styleLines color:red'>✗ Invalid PHP Version it should be greater than ".$this->requirements['php_version']." </div>";

            $this->problems[] = 'php_version';
        }
           

        foreach ($this->requirements['extensions'] as $key => $value) {
            if (extension_loaded($key)) {
                echo "<div style='$this->styleLines'>✓ <strong style='color:green'>$key</strong> PHP extension is Available <br></div>";
            } else {
                echo "<div style='$this->styleLines color:red'>✗ $key extension is MISSSING <br> <br>";
                echo "<span style='color:#585858'>enable $key extension using cPanel or php.ini or contact your hosting provider.</span> </div>";

                $this->problems[] = 'extensions-'.$key;
            }
        }

        try {
            $dbPdo = DB::connection()->getPdo();

            echo "<div style='$this->styleLines'>✓ <strong style='color:green'>Database</strong> Connected</div>";
// __pr($dbPdo->query('select version()')->fetchColumn(), $this->requirements['mysql_version']);
        //   if($dbPdo->query('select version()')->fetchColumn() >= $this->requirements['mysql_version']) {
            //        echo "<div style='$this->styleLines'>✓ <strong style='color:green'>MySQL</strong> version is OK</div>";
            $missingTables = [];

            foreach ($this->requirements['tables'] as $key => $value) {
                if (! Schema::hasTable($key)) {
                    $missingTables[] = $key;
                }
            }

            if (! empty($missingTables)) {
                echo "<div style='$this->styleLines'>✗ <span style='color:red'>MySQL Queries</span> needs to be executed from <span style='color:red'>".$this->requirements['sql_file']."</span>. <br> <strong>".implode(', ', $missingTables)."</strong> tables are missing. Read setup guide. </div>";

                $this->problems[] = 'missing-tables';
            } else {
                echo "<div style='$this->styleLines'>✓ <strong style='color:green'>MySQL Queries</strong> seems to be executed. Required Tables are exists.</div>";

                $adminUser = DB::table($this->requirements['user_table'])->where($this->requirements['user_find'])->first();

                if (__isEmpty($adminUser)) {
                        echo "<div style='$this->styleLines'>✗ <span style='color:red'>Admin user</span> is missing. You may not executed all the queries from <span style='color:red'>".$this->requirements['sql_file']."</span>, Cross check that you have executed all the SQL insert queries properly.</div>";

                        $this->problems[] = 'missing-admin-user';
                } else {
                    echo "<div style='$this->styleLines'>✓ <strong style='color:green'>Admin user</strong> is present.</div>";
                }
            }

          /* } else {
           echo "<div style='$this->styleLines color:red'>✗ Invalid MySQL Version it should be greater than ".$this->requirements['mysql_version']." </div>";

          $this->problems[] = 'mysql_version';
           }*/
        } catch (Exception $e) {
            echo ("<div style='$this->styleLines color:red'>✗ Unable to connect to database. Please correct your database settings in <strong>.env.php</strong>. Follow the setup guide.</div>");

            $this->problems[] = 'database';
        }

        if (empty($this->problems)) {
            echo "<div style='text-align:center;'><h1 style='color:green'>Congratulation!! All seems to be GOOD!!<br></h1>You can proceed, Please delete <strong>verify-install.php</strong></div>";
        } else {
            echo "<div style='text-align:center;'><h1 style='color:red'>Opps .... Please fix highlighted issues in RED above.</h1></div>";
        }

            echo '</body></html>';
    }
}

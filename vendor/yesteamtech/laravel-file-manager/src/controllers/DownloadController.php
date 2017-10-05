<?php namespace Yesteamtech\Laravelfilemanager\controllers;

use Yesteamtech\Laravelfilemanager\controllers\Controller;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Response;

/**
 * Class DownloadController
 * @package Yesteamtech\Laravelfilemanager\controllers
 */
class DownloadController extends LfmController {

    /**
     * Download a file
     *
     * @return mixed
     */
    public function getDownload()
    {
        return Response::download(parent::getPath('directory') . Input::get('file'));
    }

}

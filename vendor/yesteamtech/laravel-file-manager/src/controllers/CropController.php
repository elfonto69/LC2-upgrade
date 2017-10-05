<?php namespace Yesteamtech\Laravelfilemanager\controllers;

use Yesteamtech\Laravelfilemanager\controllers\Controller;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\View;
use Intervention\Image\Facades\Image;

/**
 * Class CropController
 * @package Yesteamtech\Laravelfilemanager\controllers
 */
class CropController extends LfmController {

    /**
     * Show crop page
     *
     * @return mixed
     */
    public function getCrop()
    {
        $working_dir = Input::get('working_dir');
        $img = parent::getUrl('directory') . Input::get('img');
        $imgName = Input::get('img');

        return View::make('laravel-filemanager::crop')
            ->with(compact('working_dir', 'img', 'imgName'));
    }


    /**
     * Crop the image (called via ajax)
     */
    public function getCropimage()
    {
        $image = Input::get('img');
        $imgName = Input::get('imgName');
        $workingDir    = trim(Input::get('working_dir'));
        $dataX = Input::get('dataX');
        $dataY = Input::get('dataY');
        $dataHeight = Input::get('dataHeight');
        $dataWidth = Input::get('dataWidth');

        $imagePath = $this->getImagePathForProcess($workingDir, $imgName);

        // crop image
        $tmp_img = Image::make($imagePath);
        $tmp_img->crop($dataWidth, $dataHeight, $dataX, $dataY)
            ->save($imagePath);

        // make new thumbnail
        $thumb_img = Image::make($imagePath);
        $thumb_img->fit(200, 200)
            ->save(parent::getPath('thumb') . parent::getFileName($image)['short']);
    }

}

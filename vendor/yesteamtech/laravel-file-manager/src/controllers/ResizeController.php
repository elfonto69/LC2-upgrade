<?php namespace Yesteamtech\Laravelfilemanager\controllers;

use Yesteamtech\Laravelfilemanager\controllers\Controller;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\View;
use Intervention\Image\Facades\Image;

/**
 * Class ResizeController
 * @package Yesteamtech\Laravelfilemanager\controllers
 */
class ResizeController extends LfmController {

    /**
     * Dipsplay image for resizing
     *
     * @return mixed
     */
    public function getResize()
    {
        $ratio = 1.0;
        $image = Input::get('img');

        $path_to_image   = parent::getPath('directory') . $image;
        $original_width  = Image::make($path_to_image)->width();
        $original_height = Image::make($path_to_image)->height();

        $scaled = false;

        if ($original_width > 600) {
            $ratio  = 600 / $original_width;
            $width  = $original_width  * $ratio;
            $height = $original_height * $ratio;
            $scaled = true;
        } else {
            $width  = $original_width;
            $height = $original_height;
        }

        if ($height > 400) {
            $ratio  = 400 / $original_height;
            $width  = $original_width  * $ratio;
            $height = $original_height * $ratio;
            $scaled = true;
        }

        return View::make('laravel-filemanager::resize')
            ->with('img', parent::getUrl('directory') . $image)
            ->with('imgName', $image)
            ->with('height', number_format($height, 0))
            ->with('width', $width)
            ->with('original_height', $original_height)
            ->with('original_width', $original_width)
            ->with('scaled', $scaled)
            ->with('ratio', $ratio);
    }


    public function performResize()
    {
        $img    = Input::get('img');
        $imgName    = Input::get('imgName');
        $workingDir    = trim(Input::get('working_dir'));
        $dataX  = Input::get('dataX');
        $dataY  = Input::get('dataY');
        $height = Input::get('dataHeight');
        $width  = Input::get('dataWidth');

        try {
            Image::make($this->getImagePathForProcess($workingDir, $imgName))->resize($width, $height)->save();
            return "OK";
        } catch (Exception $e) {
            return "width : " . $width . " height: " . $height;
            return $e;
        }

    }

}

<?php
$middlewares = \Config::get('lfm.middlewares');
array_push($middlewares, '\Yesteamtech\Laravelfilemanager\middleware\MultiUser');

// make sure authenticated
Route::group(array('middleware' => $middlewares, 'prefix' => 'laravel-filemanager'), function ()
{
    // Show LFM
    Route::get('/', 'Yesteamtech\Laravelfilemanager\controllers\LfmController@show');

    // upload
    Route::any('/upload', 'Yesteamtech\Laravelfilemanager\controllers\UploadController@upload');

    // list images & files
    Route::get('/jsonitems', 'Yesteamtech\Laravelfilemanager\controllers\ItemsController@getItems');

    // folders
    Route::get('/newfolder', 'Yesteamtech\Laravelfilemanager\controllers\FolderController@getAddfolder');
    Route::get('/deletefolder', 'Yesteamtech\Laravelfilemanager\controllers\FolderController@getDeletefolder');
    Route::get('/folders', 'Yesteamtech\Laravelfilemanager\controllers\FolderController@getFolders');

    // crop
    Route::get('/crop', 'Yesteamtech\Laravelfilemanager\controllers\CropController@getCrop');
    Route::get('/cropimage', 'Yesteamtech\Laravelfilemanager\controllers\CropController@getCropimage');

    // rename
    Route::get('/rename', 'Yesteamtech\Laravelfilemanager\controllers\RenameController@getRename');

    // scale/resize
    Route::get('/resize', 'Yesteamtech\Laravelfilemanager\controllers\ResizeController@getResize');
    Route::get('/doresize', 'Yesteamtech\Laravelfilemanager\controllers\ResizeController@performResize');

    // download
    Route::get('/download', 'Yesteamtech\Laravelfilemanager\controllers\DownloadController@getDownload');

    // delete
    Route::get('/delete', 'Yesteamtech\Laravelfilemanager\controllers\DeleteController@getDelete');
});

<?php 
	function buildSidebarMenu($data) {

		$menuMarkup = '';

		if (!empty($data)) {

			foreach ($data as $category) {

				$title  = ucwords($category['name']);
				$cateID = $category['id'];

				$categoriesRoute = categoriesProductRoute($cateID, $title);
				$path = (Request::url()) == $categoriesRoute ? 'active' : '';

				if (!empty($category['children'])) {
					
					$menuMarkup .= "<li class='".$path."'><a href='".$categoriesRoute."' class=''>".$title."</a><ul>";
					$menuMarkup .= buildSidebarMenu($category['children']);
					$menuMarkup .= "</li></ul>";

				} else {

					$menuMarkup .= "<li class='".$path."'><a href='".$categoriesRoute."' class='lw-item-link'>".$title."</a></li>";

				}
			}
		}
		
		return $menuMarkup;
	}
?>

<?= buildSidebarMenu($menuData['sideBarCategoriesMenuData']) ?>
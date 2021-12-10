<?php

/**
 * Plugin Name: News Extender
 * Description: Extends the rest api by embedding categories and featured image
 * Author: AJ Caldwell
 * Author URI: https://tomatrow.com
 */

function post_full_data_json( $data, $post, $context ) {
    try {
        $featured_image_id = $data->data['featured_media']; // get featured image id
        $featured_image_url = wp_get_attachment_image_src( $featured_image_id, 'original' ); // get url of the original size
        
        if ( $featured_image_url ) {
            $data->data['featured_image_url'] = $featured_image_url[0];
        }
        
        $full_categories = wp_get_post_categories($post->ID, array( 'fields' => 'all' ));
        
        if ($full_categories) {
            // foreach($categories as $category) {}
            $data->data['full_categories'] = array_map(function($category) {
                return array(
                    "name" => $category->name,
                    "id" => $category->term_id,
                    "slug" => $category->slug
                );
            }, $full_categories);
        }
    } catch (Exception $e) {} 
  return $data;
}
add_filter( 'rest_prepare_post', 'post_full_data_json', 10, 3 );

?>
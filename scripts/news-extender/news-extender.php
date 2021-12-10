<?php

/**
 * Plugin Name: News Extender
 * Description: Extends the rest api by embedding categories and featured image, and calls webhook to rebuild https://thomas-carter-news.netlify.app
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


// also rebuild the netlify site as needed

add_action('publish_future_post', 'nb_webhook_future_post', 10);
add_action('publish_post', 'nb_webhook_post', 10, 2);
add_action('publish_page', 'nb_webhook_post', 10, 2);
add_action('post_updated', 'nb_webhook_update', 10, 3);

function nb_webhook_future_post( $post_id ) {
  nb_webhook_post($post_id, get_post($post_id));
}

function nb_webhook_update($post_id, $post_after, $post_before) {
  nb_webhook_post($post_id, $post_after);
}

function nb_webhook_post($post_id, $post) {
  if ($post->post_status === 'publish') {
    $url = curl_init('https://api.netlify.com/build_hooks/61b2ed112a10a49ffc14c09f');
    curl_setopt($url, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($url, CURLOPT_RETURNTRANSFER, true);
    curl_exec($url);
  }
}

?>
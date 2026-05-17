<?php
/**
 * GitHub API Integration for Portfolio
 */

function get_github_repos($username) {
    // Adding type=all ensures that both original repositories and forks are fetched
    $url = "https://api.github.com/users/{$username}/repos?sort=updated&per_page=100&type=all";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_USERAGENT, 'FaakhirPortfolioApp'); 
    
    $response = curl_exec($ch);
    
    if (curl_errno($ch)) {
        return [];
    }
    
    curl_close($ch);
    
    $data = json_decode($response, true);
    
    if (!is_array($data)) {
        return [];
    }

    return $data;
}
?>

<?php
/**
 * GitHub API Integration for Portfolio
 */

function get_github_repos($username) {
    $url = "https://api.github.com/users/{$username}/repos?sort=updated&per_page=100";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_USERAGENT, 'FaakhirPortfolioApp'); // Required by GitHub API
    
    // Optional: Add GitHub Personal Access Token for higher rate limits
    // curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: token YOUR_TOKEN_HERE'));

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

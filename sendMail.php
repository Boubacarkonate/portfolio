<?php

session_start(); 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $name = htmlspecialchars($_POST["name"], ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars($_POST["message"], ENT_QUOTES, 'UTF-8');
    
    $subject = "Message Portfolio";
    $to = "boubacar.konate@etalentsocial.fr";

    $email_content = "Nom: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message";

    $headers = [
        "From" => $email,
        "Content-Type" => "text/plain; charset=utf-8" 
    ];

    $headers_str = '';
    foreach ($headers as $key => $value) {
        $headers_str .= "$key: $value\r\n";
    }

    mail($to, $subject, $email_content, $headers_str);
    
    $_SESSION['success'] = true;

  
    header("Location: index.html");
    exit();
}
?>

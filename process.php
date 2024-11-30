<?php 
// Database connection 
$host = "localhost"; 
$user = "root";
$username = "root";
$password = "your_password"; 


$conn = new mysqli ($host, $user, $password); 
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    }
    
    $sql = "SELECT * FROM users";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo "Username: " . $row["username"] . "<br>";
            echo "Password: " . $row["password"] . "<br>";
        }
    } else {
        echo "0 results";
    }
    
    $conn->close();
?>  // Close connection

$conn->close(); 
?> 



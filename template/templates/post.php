<?php
    if(isset($_POST['submit']))
    {
        $fname=$_POST['fname'];
        $lname=$_POST['lname'];
        $email=$_POST['email'];

        echo "Your First Name is : ".$fname."<br>";
        echo "Your Last Name is : ".$lname."<br>";
        echo "Your Email is : ".$email;
    }
?>
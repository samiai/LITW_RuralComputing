<?php
    if(isset($_POST['submit']))
    {
        echo "so posted something?";
        $nature=htmlspecialchars($_POST['nature']);
        $bff=$_POST['bff'];
        $forgotten=$_POST['forgotten'];
        $smash=$_POST['smash'];

        echo "The answer for Nature is : ".$nature."<br>";
        echo "The answer for bff is : ".$bff."<br>";
        echo "The answer for forgotten is".$forgotten."<br>";
        echo "the answer for smash is ".$smash;
        echo $nature,' ',$bff;
    }
    echo "Where am i ?";
?>

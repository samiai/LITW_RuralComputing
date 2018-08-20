<?php
require_once("slogan-config.php");

$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
mysqli_set_charset($conn, "utf8");

$stmt = $conn->prepare("INSERT INTO studyData (`participantId`, `data`) VALUES (?, ?)");

if ( false===$stmt ) {
   echo "Failed: " . mysqli_error($conn);
   die('prepare() failed: ' . htmlspecialchars($conn->error));
}

$participantId = $_POST["participant_id"];
$data = $_POST["data"];

//$data = file_get_contents('php://input');
$rc = $stmt->bind_param('is',$participantId, $data);

if ( false===$rc ) {
   echo "Failed: " . mysqli_error($conn);
   die('bind_param() failed: ' . htmlspecialchars($stmt->error));
}

$rc = $stmt->execute();
if ( false===$rc ) {
   echo "Failed: " . mysqli_error($conn);
   die('execute() failed: ' . htmlspecialchars($stmt->error));
}

$stmt->close();

?>
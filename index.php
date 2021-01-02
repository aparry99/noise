<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="description" content="This is a website for streaming high quality music while enjoying audio visualization.">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <link rel="stylesheet" href="css\style.css">
  <script src="https://code.iconify.design/1/1.0.7/iconify.min.js"></script>
  <!-- FA -->
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
  <!-- GFonts -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap">
  <!-- MDB + BS -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.19.1/css/mdb.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">

  <title>NOISE</title>
</head>
<link rel="icon" type="image/png" href="icon.png">

<!-- getUserState on page load -->

<body onload="getUserState()">
  <script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js" integrity="sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr/aWKhXdBNmNb5D92v7s" crossorigin="anonymous"></script>
  <?php
  session_start();
  session_regenerate_id();
  ini_set('display_errors', 1);
  // ini_set('display_startup_errors', 1);
  error_reporting(E_ALL & ~E_NOTICE);

  require_once('includes/autoloader.php');
  require_once('includes/db.php');
  require_once('includes/main.php');

  $Choon = new Choon($Conn);
  $choons = $Choon->getAllChoons();
  $choons_json = json_encode((array)$choons);
  // return php $result as array for use in JS.

  ?>

  <script type="text/javascript">
    //parse PHP array as JSON
    var jsonPHP = <?php echo $choons_json ?>;


    // for (let i = 0; i < jsonPHP.length; i++) {
    //   tracks=jsonPHP[i];
    //   console.log(tracks);
    // }
  </script>

  <!-- <canvas id="canvas-background" height="1920" width="2000"></canvas> -->
  <nav class="navbar navbar-expand-md navbar-light bg-nav" style="box-shadow:none">
    <a class="navbar-brand" href=".">
      <img src="assets/noise_logo.png" alt="Website logo" height="60px">
    </a>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto"></ul>
      <form action="includes/logout.php">
        <button id="logoutBtn" class="btn btn-outline-success my-2 my-sm-0" style="display: none;">Logout</button>
      </form>
    </div>
  </nav>
  <!-- PHP Register/Login form validation -->
  <?php
  $User = new User($Conn);

  if ($_POST) {
    if ($_POST['register']) {
      if (!$_POST['email']) {
        $error = "Email not set.";
      } else if (!$_POST['password']) {
        $error = "Password not set.";
      } else if (!$_POST['password_confirm']) {
        $error = "Confirm password not set.";
      } else if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
        $error = "Invalid email address.";
      } else if ($_POST['password'] !== $_POST['password_confirm']) {
        $error = "Password mismatch.";
      } else if (strlen($_POST['password']) < 8) {
        $error = "Password does not meet length requirement of 8 characters.";
      }

      if ($error) {
        // echo $error;
      } else {
        //register
        $attempt = $User->createUser($_POST);

        if ($attempt) {
          $success = "Account has been created. Please login.";
        } else {
          $error = "An error occured, please try again later.";
        }
      }
    } else if ($_POST['login']) {
      if (!$_POST['email']) {
        $error = "Email not set.";
      } else if (!$_POST['password']) {
        $error = "Password not set.";
      } else if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
        $error = "Invalid email address.";
      } else if (strlen($_POST['password']) < 8) {
        $error = "Password does not meet length requirement of 8 characters.";
      }

      if ($error) {
        //don't really need to do anything?
        echo $error;
      } else {
        //login
        $user_data = $User->loginUser($_POST);

        if ($user_data) {
          $_SESSION['is_logged_in'] = true;
          $_SESSION['user_data'] = $user_data;

          $success = "Logged in successfully.";

          echo "<meta http-equiv='refresh' content='0'>";
        } else {
          $_SESSION['is_logged_in'] = false;
          $error = "Incorrect login credentials.";
        }
      }
    }
  }
  ?>


  <!-- Modal -->
  <!-- <div class="modal fade" id="modalLogin" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content"> -->


  <!-- </div>
    </div>
  </div> -->

  <script>
    // getUserState resets formID localStorage, while setting whether user is currently loggedIn.
    // localStorage used alongside PHP due to PHP only being run on page load, making passing of variables difficult.
    function getUserState() {
      var loggedIn = "<?php echo $_SESSION['is_logged_in'] == 'yes' ? 'true' : 'false'; ?>";
      console.log("getUserState() = " + loggedIn);
      localStorage.setItem("loggedIn", loggedIn);
    }


    // on form submit, grab $this formID.
    // used for storing current form in localStorage for reference
    $(document).delegate('form', 'submit', function(event) {
      var $form = $(this);
      var formID = $form.attr('id');
      localStorage.setItem("formID", formID);
    });
  </script>

  <div class="credentialsContainer" style="display: none;">
    <div class="row">
      <div class="col-md-4 offset-md-4">
        <h3 class="text-center mt-4 mt-1">Please login to use our services.</h4>
          <div class="registerContainer store">
            <div class="card">
              <header class="card-header">
                <h4 class="card-title text-center mb-1 mt-1">Register</h4>
              </header>
              <article class="card-body border-top">
                <form id="registration-form" method="post" action="">
                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                      </div>
                      <input type="email" placeholder="email@email.com" class="form-control" id="reg_email" name="email">
                    </div>
                    <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>

                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                      </div>
                      <input type="password" placeholder="********" class="form-control" id="reg_password" name="password">
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                      </div>
                      <input type="password" placeholder="********" class="form-control" id="reg_password_confirm" name="password_confirm">
                    </div>
                  </div>
                  <button type="submit" class="btn btn-primary btn-block" name="register" value="1">Register</button>
                  <p class="phpCallback text-danger text-center"><?php echo $error; ?></p>
                  <p class="phpCallback text-success text-center"><?php echo $success; ?></p>
                </form>
              </article>
              <div class="border-top card-body text-center">Have an account? <a href="#" id="loginBtn">Login</a></div>
            </div>
          </div>

          <div class="loginContainer store" style="display: none;">
            <div class="card">
              <header class="card-header">
                <h4 class="card-title text-center mb-1 mt-1">Login</h4>
              </header>
              <article class="card-body border-top">
                <form id="login-form" method="post" action="">
                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                      </div>
                      <input type="email" class="form-control" id="login_email" name="email">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                      </div>
                      <input type="password" class="form-control" id="login_password" name="password">
                    </div>
                  </div>
                  <button type="submit" class="btn btn-primary btn-block" name="login" value="1">Login</button>
                  <p class="phpCallback text-danger text-center"><?php echo $error; ?></p>
                  <p id="loginSuccess" class="phpCallback text-success text-center"><?php echo $success; ?></p>
                  </p>
                </form>
              </article>
              <div class="border-top card-body text-center">Need to register? <a href="#" id="registerBtn" style="color: #007bff">Register here</a></div>
            </div>
          </div>


      </div>
    </div>
  </div>

  <div class="sideTrackContainer" style="display: none;">
    <div class="row">
      <div class="col-md-6 d-flex flex-column" id="scroll" style="display: table;">
      <!-- initial element for appending -->
        <div class="element" id="div_0" style="display: none;">
          <div class="container-audio">
            <h4 class="text-center">
              </h3>
              <canvas id="canvas_0" height="100" width="900"></canvas>
              <audio preload="none" id="musicPlayer_0" controlslist="nodownload" controls>
                <source id="src_0" src="" type="audio/mp3">
                Your browser does not Support the audio Tag
              </audio>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 d-flex flex-column">
          <div class="container-viz" style="display: none;">
            <div id="bg"></div>
            <canvas id="canvas-circle" height="817" width="817"></canvas>
            <canvas id="canvas-circle2" height="787" width="787"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- used below library for audio visualization with own modifications to suit purpose -->
  <!-- <script src="https://cdn.jsdelivr.net/gh/foobar404/wave.js/dist/bundle.iife.js"></script> -->
  <script src="js/wave.js"></script>
  <script src="js\main.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.19.1/js/mdb.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
</body>

</html>
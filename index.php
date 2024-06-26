<!--index.php-->
<?php
    session_start();

    if (isset($_SESSION['success'])) {
      echo '<div class="' . $_SESSION['message_class'] . '">' . $_SESSION['message'] . '</div>';
      unset($_SESSION['success']);
      unset($_SESSION['message']);
      unset($_SESSION['message_class']);
  }
   
?>
<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>Portfolio</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous" />
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
  <link rel="stylesheet" href="public/css//style.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body>
  <div id="back"></div>
  <nav>
    <h1>
      <i class="fa-solid fa-laptop-code"></i>
      Boubacar Konaté 
    </h1>
    <ul>
      <li>
        <a href="https://github.com/Boubacarkonate" target="blank"><i class="fa-brands fa-github"></i></a>
      </li>
      <li>
       <a href="https://www.linkedin.com/in/boubacar-konaté-a87531261" target="blank"><i class="fa-brands fa-linkedin"></i></a>
      </li>
      <li>
       <a href="mailto:boubacar.konate@outlook.fr" target="blank"><i class="fa-regular fa-envelope"></i></a>
      </li>
      <!-- <li id="dark-light-mode" onclick="changeDarkMode()">Dark mode</li> -->
    </ul>
  </nav>

  <header>
    <div class="header-left">
      <small><span class="material-symbols-outlined"> home_pin </span>
        ÎLE-de-France France</small>
      <h1>
        Hello,<br />
        je suis Boubacar
      </h1>
      <p>DEVELOPPEUR WEB JUNIOR</p>
    </div>
    <div class="header-right">
      <img src="public/media/img.png" alt="profile-photo" />
    </div>
  </header>

  <section class="about">
    <h2>À propos de moi</h2>
    <p>
      Auparavant, j’ai travaillé plusieurs années en tant qu'éducateur
      spécialisé, en France et en Espagne, ce qui m’a permis d’acquérir de
      très bonnes compétences telles que l’organisation, la rigueur, l’écoute
      couplée à la curiosité, le conseil ainsi que des qualités relationnelles
      importantes. Mon retour en région parisienne en 2022 a marqué le début d'une
      reconversion professionnelle dans le domaine du Développement Web, un secteur
      qui suscite mon intérêt depuis longtemps. J'ai suivi la formation de Développeur Web
      et Web Mobile au sein du centre de formation Philiance en Essonne (91).
      Pendant cette formation, j'ai eu l'opportunité d'effectuer un stage professionnel.
      Après l'obtention du titre professionnel de Développeur Web en 2023, j'ai poursuivi
      ma formation en me spécialisant dans le développement mobile iOS au sein du Apple Foundation
      Program (93). Aujourd'hui, je continue à me former chaque jour avec enthousiasme, motivation,
      et des idées plein la tête, en suivant la formation de Concepteur Développeur d'Applications
      chez G2R à Paris.
    </p>
  </section>

  <div class="flexbox-container">
    <section id="mySkills">
      <h2>Mes compétences</h2>
      <p>Elles sont en constantes améliorations car pour moi la joie de ce métier fait que l’on en apprend tous les
        jours,
        d’autant plus en étant impliqué, curieux et passionné.
      </p>
      <h3>FRONT-END</h3>
      <ul>
        <li>
          <h4>html</h4>
          <span class="bar"><span class="html"></span></span>
        </li>
        <li>
          <h4>css</h4>
          <span class="bar"><span class="css"></span></span>
        </li>
        <li>
          <h4>javascript / jquery</h4>
          <span class="bar"><span class="js"></span></span>
        </li>
        <li>
          <h4>react / react native</h4>
          <span class="bar"><span class="react"></span></span>
        </li>
      </ul>

      <h3>BACK-END</h3>
      <ul>
        <li>
          <h4>php</h4>
          <span class="bar"><span class="php"></span></span>
        </li>
        <li>
          <h4>sql</h4>
          <span class="bar"><span class="sql"></span></span>
        </li>
        <li>
          <h4>symfony</h4>
          <span class="bar"><span class="symfony"></span></span>
        </li>
      </ul>
    </section>
    <figure>
      <a href="public/media/CurriculumVitae.pdf"><img class="cv" src="public/media//curriculumVitae.png"
          alt="curriculum vitae">
        <figcaption>Cliquer sur le CV</figcaption>
      </a>
    </figure>
    <a href="public/media/CurriculumVitae.pdf" target="blank" class="cv-button">Cliquer ici pour voir mon CV</a>
  </div>
  <div class="title-projet">
    <h2>Mes projets</h2>
    <p>Ci-dessous, quelques exemples de réalisations effectuées durant la formation et en stage</p>
  </div>

  <section id="projects" class="carousel1">
    <img class="control prev" src="public/media/img1.png" alt="Previous">
    <div class="slider">
      <div class="project-card" data-text="etalent"><a href="https://etalentsocial.fr/" target="blank">
          <img src="public/media/projects/etalent.png" alt="Project 1">
          <h5><i class="fa-solid fa-link"></i>etalentsocial</h5>
          <p>Projet personnel (Symfony/Html/Css/Js/MySql).</p>
        </a>
      </div>
      <div class="project-card" data-text="Description du projet 2"><a href="https://adei-france.fr/" target="blank">
          <img src="public/media/projects/adei.png" alt="Project 2">
          <h5><i class="fa-solid fa-link"></i>adei-france</h5>
          <p>Projet de stage (Wordpress/Php/MySql).</p>
        </a>
      </div>
      <div class="project-card" data-text="Description du projet 3"><a href="https://culinaire.etalentsocial.fr/" target="blank">
          <img src="public/media/projects/api_recipe.png" alt="Project 3">
          <h5><i class="fa-solid fa-link"></i>api_recipe<h5>
          <p>Projet de formation (Html/Css/Js).</p>
        </a>
      </div>
      <div class="project-card" data-text="Description du projet 4 "><a href="https://eats.etalentsocial.fr/" target="blank">
          <img src="public/media/projects/eats.png" alt="Project 4">
          <h5><i class="fa-solid fa-link"></i>maquette</h5>
          <p>Projet de formation (Html/Css).</p>
        </a>
      </div>
      <div class="project-card" data-text="Description du projet 5"><a href="https://github.com/Boubacarkonate/quizzApp-ReactNative.git" target="blank">
          <img src="public/media/projects/quiz.png" alt="Project 5">
          <h5><i class="fa-solid fa-link"></i>quiz-play</h5>
          <p>Projet de formation (React Native)</p>
        </a>
      </div>
      <div class="project-card" data-text="Description du projet 6"><a href="https://github.com/Boubacarkonate/Ateampique-test-2.git">
          <img src="public/media/projects/apprendre.png" alt="Project 6">
          <h5><i class="fa-solid fa-link"></i>apprendre à apprendre</h5>
          <p>Projet personnel (Swift/SwifUI).</p>
        </a>
      </div>
      <div class="project-card" data-text="Description du projet 6"><a href="https://github.com/Boubacarkonate/Ateampique-test-2.git">
          <img src="public/media/projects/weCare.png" alt="Project 6">
          <h5><i class="fa-solid fa-link"></i>WeCare</h5>
          <p>Projet personnel (React Native/firebase).</p>
        </a>
      </div>

    </div>
    <img class="control next" src="public/media/img2.png" alt="Next">
  </section>

  <div id="carouselExampleCaptions" class="carousel slide mx-3">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
        aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
        aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
        aria-label="Slide 3"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3"
        aria-label="Slide 4"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4"
        aria-label="Slide 5"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="5"
        aria-label="Slide 6"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="6"
        aria-label="Slide 7"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <a href="https://etalentsocial.fr/" target="blank"><img src="public/media/projects/etalent.png" class="d-block w-100" alt="project">
        <div class="carousel-caption  d-md-block bg-dark text-white">
          <h3><i class="fa-solid fa-link"></i>etalentsocial</h3>
          <p class="text-center fs-6">Projet personnel (Symfony/Html/Css/Js/MySql).</p>
        </div>
      </a>
      </div>
      <div class="carousel-item">
       <a href="https://adei-france.fr/" target="blank"><img src="public/media/projects/adei.png" class="d-block w-100" alt="project">
        <div class="carousel-caption  d-md-block bg-dark text-white">
          <h3><i class="fa-solid fa-link"></i>adei-france</h3>
          <p class="text-center fs-6">Projet de stage (Wordpress/Php/MySql).</p>
        </div>
      </a>
      </div>
      <div class="carousel-item">
       <a href="https://culinaire.etalentsocial.fr/" target="blank">
        <img src="public/media/projects/api_recipe.png" class="d-block w-100" alt="project">
        <div class="carousel-caption d-md-block bg-dark text-white">
          <h3><i class="fa-solid fa-link"></i>api_recipe<h3>
          <p class="text-center fs-6">Projet de formation (Html/Css/Js).</p>
          </div>
        </a> 
      </div>
      <div class="carousel-item">
       <a href="https://eats.etalentsocial.fr/" target="blank">
        <img src="public/media/projects/eats.png" class="d-block w-100" alt="project">
        <div class="carousel-caption d-md-block bg-dark text-white">
          <h3><i class="fa-solid fa-link"></i>maquette<h3>
          <p class="text-center fs-6">Projet de formation (Html/Css).</p>
          </div>
        </a> 
      </div>
      <div class="carousel-item">
       <a href="https://github.com/Boubacarkonate/quizzApp-ReactNative.git" target="blank">
        <img src="public/media/projects/quiz.png" class="d-block w-100" alt="project">
        <div class="carousel-caption d-md-block bg-dark text-white">
          <h3><i class="fa-solid fa-link"></i>quiz-play<h3>
          <p class="text-center fs-6">Projet de formation (React Native)</p>
          </div>
        </a> 
      </div>
      <div class="carousel-item">
       <a href="https://github.com/Boubacarkonate/Ateampique-test-2.git" target="blank">
        <img src="public/media/projects/apprendre.png" class="d-block w-100" alt="project">
        <div class="carousel-caption d-md-block bg-dark text-white">
          <h3><i class="fa-solid fa-link"></i>apprendre à apprendre<h3>
          <p class="text-center fs-6">Projet personnel (Swift/SwifUI).</p>
          </div>
        </a> 
      </div>
      <div class="carousel-item">
       <a href="https://github.com/Boubacarkonate/weCare-project.git" target="blank">
        <img src="public/media/projects/weCare.png" class="d-block w-100" alt="project">
        <div class="carousel-caption d-md-block bg-dark text-white">
          <h3><i class="fa-solid fa-link"></i>WeCare<h3>
          <p class="text-center fs-6">Projet personnel (React Native/Firebase).</p>
          </div>
        </a> 
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      <span class="carousel-control-prev-icon bg-dark text-white" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <span class="carousel-control-next-icon bg-dark text-white" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>

  <section class="contact">


 
    <h2>Contactez-moi</h2>
    <p>N'hésitez pas à me contacter, je vous répondrai dans les plus brefs délais.</p>
    <form action="sendMail.php" method="post">
      <div>
        <label for="name">Votre nom</label>
        <input type="text" id="name" name="name" required>
      </div>
      <div>
        <label for="email">Votre e-mail</label>
        <input type="email" id="email" name="email" required>
      </div>
      <div>
        <label for="message">Votre message</label>
        <textarea id="message" name="message" required></textarea>
      </div>
      <div>
        <button type="submit">Envoyer</button>
      </div>
    </form>
  </section>

  <footer>
    <div class="social-networks">
      <ul>
        <li><a href="https://github.com/Boubacarkonate" target="blank" rel="noopener noreferrer">
            <i class="fa-brands fa-github"></i>
          </a>
        </li>
        <li><a href="https://www.linkedin.com/in/boubacar-konaté-a87531261" target="blank" rel="noopener noreferrer">
            <i class="fa-brands fa-linkedin"></i>
          </a>
        </li>
        <li><a href="mailto:boubacar.konate@outlook.fr" target="blank" rel="noopener noreferrer">
            <i class="fa-regular fa-envelope"></i>
          </a>
        </li>
      </ul>
    </div>
    <p>&copy; Boubacar Konaté 2023</p>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
    crossorigin="anonymous"></script>
  <script src="public/js/script.js"></script>
</body>
</html>
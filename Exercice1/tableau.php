<?php
function somme_entre_deux($num1, $num2) {
  $tab = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  $somme = 0;
  
  for ($i = 0; $i < count($tab); $i++) {
    if ($tab[$i] >= $num1 && $tab[$i] <= $num2) {     
      $somme += $tab[$i];
    }
  }
  
  return $somme;
}
$somme = somme_entre_deux(30, 60);   // donc 30+40+50+60
echo $somme;        //ça nous donne 180

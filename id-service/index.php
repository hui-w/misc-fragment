<?php
   header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
   header("Cache-Control: post-check=0, pre-check=0", false);
   header("Pragma: no-cache");

   class DataBase extends SQLite3 {
      function __construct() {
         $this->open('id_region.db');
      }
   }

   function sqlite_table_exists(&$sqlite, $table) {
      $result = $sqlite->query("SELECT count(name) as count FROM sqlite_master WHERE type='table' AND name='$table'");
      $row = $result->fetchArray();
      $count = $row['count'];
      return $count > 0;
   }

   function main() {
      $db = new DataBase();

      // Open the database
      if (!$db) {
         echo "Error:".$db->lastErrorMsg();
      }

      // Check the table
      if (sqlite_table_exists($db, 'region')) {
         // Get records
         $sql = '';
         if (isset($_GET["c"])) {
            $sql = 'SELECT id, code, name FROM region WHERE code="'.$_GET["c"].'"';
         } else {
            $sql = "SELECT id, code, name FROM region LIMIT 10 OFFSET 0";
         }
         $ret = $db->query($sql);
         while ($row = $ret->fetchArray(SQLITE3_ASSOC) ) {
            echo "id = ". $row['id'] . "\n";
            echo "code = ". $row['code'] ."\n";
            echo "name = ". $row['name'] ."\n\n";
         }
         $db->close();
         return;
      }

      // Initialize the table and data
      include 'region_sql_vars.php';
      $ret = $db->exec($sql);
      if(!$ret){
         echo "Error:".$db->lastErrorMsg();
      } else {
         echo "Database initialized successfully\n";
      }
      $db->close();
   }

   main();
?>
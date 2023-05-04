<?php
// Uncomment if you need to have detailed error reporting
// error_reporting(E_ALL);

// Include the Handler class so we can use it. 
require("helpers/handler.php");

// Create a new request handler. 
$handler = new Handler();

// Process the request
$handler->process();

// Handler Functions

// process /api/test on a GET request
function GET(Handler $h)
{
    $data = [];
    $idx = $h->request->get["idx"] ?? false; 

    if ($idx ! == false) {

        $data = getSingle($h, $idx);

    } else {
        $data = getCollection ($h);
    }

    $h->response->json($data);
}


//dummy data to display list
function getSingle (Handler $h, $idx){
    $dummy = [
            [],
            [
                "egges",
                "beans",
                "soda"
            ],
            [
                "checken",
                "saly",
                "pepper"
            ]
    ];

    return $dummy[$idx];
}


//dummy data to display items without index, Colletion of list 
function getCollection (Handler $h){
    $dummy = [
        [],
        [
            "name"=>"Mon Shopping"
            "idx"=>1
    ],
    [ 
        "name"=>"Tuesday Shopping"
        "idx"=>2
    ]
];

return $dummy;
}


// api/test.php?id=123 would execute this function
function getSingleOld(Handler $handler, $id)
{
    // Use the $id and output just 1 thing

    $pdo = $handler->db->PDO();

    $query = "SELECT * FROM `items` WHERE idx=(?)";

    $statement = $pdo->prepare($query);

    $statement->execute([$id]);  // ans: array :[$id,$name,$address]

    $result = $statement->fetchAll();

    $handler->response->json($result);
}

// api/test.php would execute this function
function getCollectionOld(Handler $handler)
{
    $pdo = $handler->db->PDO();

    $query = 'CALL get_lists()';  //mySQL function  where this statement used ? 

    $statement = $pdo->prepare($query);

    $statement->execute();    // What is the different between this with line 40 execute() ?

    $results = $statement->fetchAll();

    // ** Different between them ??? **
    
    $handler->response->json($results);  // JSON string

    
    // Output a list of things
    $handler->response->json(   // Here is arrary converting to JSON string ? 
        [
            ["name" => "joe", "age" => 82],
            ["name" => "bob", "age" => 99]  //name, address, birthday, image url, new folder, php accept images,
        ]
    );
}



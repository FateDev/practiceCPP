lastListElement :: [Int] -> Int
lastListElement list = (head . reverse) list -- function composition using .

lastListElement2 :: [Int] -> Int
lastListElement2 list = last list

lastListElement3 :: [Int] -> Int
lastListElement3 = last

main =
  print
    ( lastListElement [1,9 .. 100]
    , lastListElement2 [1,9 .. 100]
    , lastListElement3 [1,9 .. 100])

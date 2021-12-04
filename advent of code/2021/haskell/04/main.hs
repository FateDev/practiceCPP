main = do 
  contents <- readFile "input.txt"
  let (nums:boards) = splitBlock contents
  let bingoNums = map readInt (splitOn ',' nums)
  let lineToNumList = (\line -> map readInt (words line))
  let parToNumListList = (\paragraph -> map lineToNumList (lines paragraph))
  let rowsCols = (\block -> [block, (generateColumns block)])
  let processed = map parToNumListList boards
  let allBoards = concat $ map rowsCols processed
  let idDboards = identifyBoard allBoards 0
  let wins = playBingo bingoNums idDboards
  putStrLn $ "Part 1: " ++ (show (head wins))
  putStrLn $ "Part 2: " ++ (show (last wins))
  print wins

type Board = (Int, [[Int]])

identifyBoard :: [[[Int]]] -> Int -> [Board]
identifyBoard [] _ = []
identifyBoard (board':boards') bID = (bID `div` 2, board') : identifyBoard boards' (bID+1)

playBingo :: [Int] -> [Board] -> [Int]
playBingo nums boards
  = play 1 []
  where
    play :: Int -> [Int] -> [Int]
    play n wonBoards
      | n == ((length nums)-1) = []
      | bID == -1 = play (n+1) wonBoards
      | otherwise = (sumUnmarked * winningNum) : (play n (bID:wonBoards))
      where
        (bID, winningBoard) = playAGame n boards nums wonBoards
        winningNum = nums !! (n-1)
        unmarked = filter (\el -> not $ elemFirstN el n nums) (concat winningBoard)
        sumUnmarked = sum unmarked
        

playAGame :: Int -> [Board] -> [Int] -> [Int] -> Board
playAGame _ [] _ _ = (-1, [])
playAGame n (b@(bID,board):boards) nums wonBoards
  | not boardWon || (bID `elem` wonBoards) = playAGame n boards nums wonBoards
  | otherwise = b
  where
    boardWon = or $ map (\line -> all (\el -> elemFirstN el n nums) line) board

generateColumns :: [[Int]] -> [[Int]]
generateColumns rows
  = genColsHelper (minimum $ map length rows) 0
  where
    genColsHelper :: Int -> Int -> [[Int]]
    genColsHelper len idx
      | len == 0 = []
      | otherwise = (map (!! idx) rows) : genColsHelper (len-1) (idx+1)

splitBlock :: String -> [String]
splitBlock ['\n'] = []
splitBlock ('\n':'\n':input) = [] : splitBlock input
splitBlock (character:input)
  = splitData
  where
    retData = splitBlock input
    splitData = (character : (emptyHead retData)) : (emptyTail retData)

readInt :: String -> Int
readInt = read

emptyHead :: [String] -> String
emptyHead [] = ""
emptyHead lst = head lst

elemFirstN :: Eq a => a -> Int -> [a] -> Bool
elemFirstN _ _ [] = False
elemFirstN el n lst
  | n == 0 = False
  | el == (lst !! (n-1)) = True
  | otherwise = elemFirstN el (n-1) lst

splitOn :: Char -> String -> [String]
splitOn _ [] = []
splitOn token [chr]
  | token == chr = []
  | otherwise = [[chr]]
splitOn token (chr:chars)
  | chr == token = [] : splitOn token chars
  | otherwise = appended
  where
    (w:ws) = splitOn token chars
    appended = (chr : w) : ws

emptyTail :: [String] -> [String]
emptyTail [] = []
emptyTail lst = tail lst

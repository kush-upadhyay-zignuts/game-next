import PropTypes from 'prop-types';

function GameCard({
  gameTitle = "Unknown Game Title",
  gamePlatform = "N/A",
  gameScore = "N/A",
  gameGenre = "N/A",
  editors_choice = ""

}) {
  return (
    <div className="relative w-full md:w-96 flex flex-col p-3 border-2 border-gray-400 rounded-md hover:bg-neutral-200 duration-150">
      <div className="flex gap-2 w-fit">
        <span className='h-fit flex items-center gap-1 text-sm font-medium bg-sky-800 text-white rounded-full px-2 py-0.5'>
          <span className='material-icons text-sm'>
            star
          </span>
          {gameScore}
        </span>
        {
          editors_choice == "Y" && (
            <span className='h-fit w-fit flex items-center gap-1 text-sm bg-green-900 text-white rounded-full px-2 py-0.5'>
              <span className="material-icons text-[2px]">
                verified
              </span>
              Editor&apos;s Choice
            </span>
          )
        }
      </div>
      <span className='w-full text-xl py-2 pt-1 font-bold'>{gameTitle}</span>
      <div className='flex flex-col gap-y-2'>
        <div className='flex items-center gap-x-2'>
          <span className='material-icons text-sky-800'>category</span>
          <span className="font-semibold text-md text-gray-700">{gameGenre}</span>
        </div>
        <div className='flex items-center gap-x-2'>
          <span className='material-icons text-md text-green-900'>devices</span>
          <span className="font-semibold text-md text-gray-700">{gamePlatform}</span>
        </div>
      </div>
    </div >
  )
}

export default GameCard;

GameCard.propTyps = {
  gameTitle: PropTypes.string,
  gamePlatform: PropTypes.string,
  gameScore: PropTypes.string,
  gameGenre: PropTypes.string,
  editors_choice: PropTypes.string
}
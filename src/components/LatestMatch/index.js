import './index.css'

const LatestMatch = props => {
  const {latestMatchDetails} = props
  const {
    competingTeam,
    competingTeamLogo,
    date,
    firstInnings,
    manOfTheMatch,
    result,
    secondInnings,
    umpires,
    venue,
  } = latestMatchDetails

  return (
    <div className="match-container">
      <h1 className="match-heading">Latest Matches</h1>
      <div className="match-card">
        <div className="match-details-logo-container">
          <div className="match-details-container-1">
            <p className="match-team-name">{competingTeam}</p>
            <p className="match-date">{date}</p>
            <p className="match-details">{venue}</p>
            <p className="match-details">{result}</p>
          </div>
          <img
            src={competingTeamLogo}
            alt={`latest match ${competingTeam}`}
            className="match-team-logo"
          />
        </div>
        <hr className="h-line" />
        <div className="match-details-container-2">
          <p className="match-details-label">First Innings</p>
          <p className="match-details-value">{firstInnings}</p>
          <p className="match-details-label">Second Innings</p>
          <p className="match-details-value">{secondInnings}</p>
          <p className="match-details-label">Man Of The Match</p>
          <p className="match-details-value">{manOfTheMatch}</p>
          <p className="match-details-label">Umpires</p>
          <p className="match-details-value">{umpires}</p>
        </div>
      </div>
    </div>
  )
}

export default LatestMatch

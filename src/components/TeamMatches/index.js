import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MatchCard from '../MatchCard'
import LatestMatch from '../LatestMatch'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class TeamMatches extends Component {
  state = {isLoading: true, teamMatchesData: []}

  componentDidMount() {
    this.getTeamMatches()
  }

  getFormattedData = teamMatch => ({
    competingTeam: teamMatch.competing_team,
    competingTeamLogo: teamMatch.competing_team_logo,
    date: teamMatch.date,
    firstInnings: teamMatch.first_innings,
    id: teamMatch.id,
    manOfTheMatch: teamMatch.man_of_the_match,
    matchStatus: teamMatch.match_status,
    result: teamMatch.result,
    secondInnings: teamMatch.second_innings,
    umpires: teamMatch.umpires,
    venue: teamMatch.venue,
  })

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(this.props)
    // console.log(id)

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const fetchedData = await response.json()
    // console.log(fetchedData)

    const formattedData = {
      teamBannerUrl: fetchedData.team_banner_url,
      latestMatchDetails: this.getFormattedData(
        fetchedData.latest_match_details,
      ),
      recentMatches: fetchedData.recent_matches.map(eachMatch =>
        this.getFormattedData(eachMatch),
      ),
    }

    this.setState({teamMatchesData: formattedData, isLoading: false})
  }

  getTeamMatchClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  renderTeamMatches = () => {
    const {teamMatchesData} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = teamMatchesData

    return (
      <div className="responsive-container">
        <img
          src={teamBannerUrl}
          alt="team banner"
          className="team-banner-image"
        />
        <LatestMatch latestMatchDetails={latestMatchDetails} />
        <ul className="match-cards-container">
          {recentMatches.map(eachMatch => (
            <MatchCard key={eachMatch.id} matchDetails={eachMatch} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div>
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading, teamMatchesData} = this.state
    const teamMatchClassName = this.getTeamMatchClassName()
    console.log(teamMatchesData)
    return (
      <div className={`team-match-container ${teamMatchClassName}`}>
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}

export default TeamMatches

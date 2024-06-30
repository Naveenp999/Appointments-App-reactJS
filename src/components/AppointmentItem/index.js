import './index.css'
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {content, likechanges} = props
  const {id, title, date, isStarred} = content

  const liked = () => likechanges(id)
  return (
    <li className="item-container">
      <div className="starr-container">
        <p className="item-heading">{title}</p>
        <button className="starr-btn" data-testid="star" onClick={liked}>
          {!isStarred ? (
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
              className="starr-icon"
              alt="star"
            />
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
              alt="star"
              className="starr-icon"
            />
          )}
        </button>
      </div>
      <p className="alloted-date">
        {format(new Date(date), 'dd MMMM yyyy, EEEE')}
      </p>
    </li>
  )
}

export default AppointmentItem

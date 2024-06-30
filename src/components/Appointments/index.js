import './index.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {title: '', date: '', appointmentList: [], wantStarred: false}

  addDetails = event => {
    event.preventDefault()
    const {title, date, appointmentList} = this.state
    const newuser = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }
    this.setState({
      appointmentList: [...appointmentList, newuser],
      date: '',
      title: '',
    })
  }

  titlechange = event => this.setState({title: event.target.value})

  datechange = event => this.setState({date: event.target.value})

  liked = identification => {
    const {appointmentList} = this.state
    const newArray = appointmentList.map(element => {
      if (element.id === identification) {
        return {...element, isStarred: !element.isStarred}
      }
      return element
    })
    this.setState({appointmentList: newArray})
  }

  onlystarred = () => this.setState(prev => ({wantStarred: !prev.wantStarred}))

  check = element => {
    const {wantStarred} = this.state
    if (wantStarred === true) {
      if (element.isStarred === true) {
        return true
      }
      return false
    }
    return true
  }

  wantStarredOnly = () => {
    const {appointmentList} = this.state
    const newList = appointmentList.filter(
      element => element.isStarred === true,
    )
    return newList.map(element => (
      <AppointmentItem
        key={element.id}
        content={element}
        likechanges={this.liked}
      />
    ))
  }

  wantall = () => {
    const {appointmentList} = this.state
    return appointmentList.map(element => (
      <AppointmentItem
        key={element.id}
        content={element}
        likechanges={this.liked}
      />
    ))
  }

  render() {
    const {title, date, wantStarred} = this.state

    return (
      <div className="appointment">
        <div className="user-details-container">
          <div className="horizantal">
            <div className="user-details">
              <h1 className="heading">Add Appointment</h1>
              <form className="user-details-form" onSubmit={this.addDetails}>
                <div>
                  <label className="sub-heading" htmlFor="user">
                    TITLE
                  </label>
                  <input
                    className="user-input"
                    onChange={this.titlechange}
                    type="text"
                    value={title}
                    id="user"
                  />
                </div>
                <div>
                  <label className="sub-heading" htmlFor="user-1">
                    DATE
                  </label>
                  <input
                    type="date"
                    className="user-input"
                    onChange={this.datechange}
                    value={date}
                    id="user-1"
                  />
                </div>
                <button className="add-btn" type="submit">
                  Add
                </button>
              </form>
            </div>
            <div className="img-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="contacts-img"
              />
            </div>
          </div>
          <hr className="line" />
          <div className="appointment-heading">
            <h1 className="appointment-text">Appointments</h1>
            <button
              className={`starred-button ${wantStarred=== true ? 'active' : ''}`}
              type="button"
              onClick={this.onlystarred}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-list">
            {wantStarred === true ? this.wantStarredOnly() : this.wantall()}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments

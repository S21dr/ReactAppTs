import React from 'react';
import s from './Profile_info.module.css'


class profileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deActivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }
    onChangeStatusInput = (e) => {
        this.setState({
            status: e.target.value
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status)
            this.setState({
                status: this.props.status
            })
    }
    render() {
        return <div className={s.status}>
            {
                this.state.editMode
                    ? <input onChange={this.onChangeStatusInput} autoFocus={true} onBlur={this.deActivateEditMode} type="text" value={this.state.status} />
                    : <span onClick={this.activateEditMode}>{!this.props.status ? "No status" : this.props.status}</span>
            }
        </div>
    }
}




export default profileStatus;
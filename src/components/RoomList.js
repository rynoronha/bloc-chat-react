import React, { Component } from 'react';
import { Button, Modal, Form, Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
    rooms: [],
    show: false,
    newRoomName: ''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');

    /*this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);*/

  }

  componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       room.key = snapshot.key;
       this.setState({ rooms: this.state.rooms.concat( room ) })
     });
   }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value })
  }

  createRoom(e) {
    e.preventDefault();
    this.roomsRef.push({name: this.state.newRoomName});
    this.setState({newRoomName: ''});
  }

  render() {
     return (
       <section className="room-list">
        <h3>Room List</h3>
        <Form onSubmit={ (e) => this.createRoom(e) }>
          <FormGroup id="form-new-room-name">
            <ControlLabel>New Room</ControlLabel>{' '}
            <FormControl
              type="text"
              placeholder="enter room name"
              value={ this.state.newRoomName }
              onChange={ (e) => this.handleChange(e) }
            />
          </FormGroup>

          <FormGroup>
           <Button type="submit">Create Room</Button>
          </FormGroup>
         </Form>

        {/*<Button id="new-room" bsStyle="primary" onClick={this.handleShow}>New Room</Button>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
        >
          <Modal.Header>
            <Modal.Title>Create New Room</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Enter a room name</p>
          </Modal.Body>
          <Modal.Footer>
            <Button id="modal-cancel" onClick={this.handleClose}>Cancel</Button>
            <Button id="modal-create-room" bsStyle="primary">Create Room</Button>
          </Modal.Footer>
        </Modal> */}

        {
            this.state.rooms.map( (room)  =>
              <span className="room-name" key={room.key}>
                <p>{room.name}</p>
              </span>
       )}
       </section>

     );
   }
}

export default RoomList;

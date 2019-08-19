import React, { Component } from 'react';
import './drag.js';
class DragAndDrop extends Component {
  state = {
    drag: false
  }
  dropRef = React.createRef()
  handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }
  handleDragIn = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.dragCounter++
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({drag: true})
    }
  }
  handleDragOut = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.dragCounter--
    if (this.dragCounter === 0) {
      this.setState({drag: false})
    }
  }
  handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({drag: false})
    var filesAdd=[];
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        var files = e.dataTransfer.files;
        for (var i = 0; i < files.length; i++) {
            if(files[i].type == 'image/jpeg' || files[i].type == 'image/png' || files[i].type == 'image/jpg'){
                filesAdd.push(files[i]);
            }
        }
        this.props.handleDrop(filesAdd);

      // if(file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/jpg'){
      //     this.props.handleDrop(e.dataTransfer.files)
      // }
      e.dataTransfer.clearData()
      this.dragCounter = 0
    }
  }
  componentDidMount() {
    let div = this.dropRef.current
    div.addEventListener('dragenter', this.handleDragIn)
    div.addEventListener('dragleave', this.handleDragOut)
    div.addEventListener('dragover', this.handleDrag)
    div.addEventListener('drop', this.handleDrop)
  }
  componentWillUnmount() {
    let div = this.dropRef.current
    div.removeEventListener('dragenter', this.handleDragIn)
    div.removeEventListener('dragleave', this.handleDragOut)
    div.removeEventListener('dragover', this.handleDrag)
    div.removeEventListener('drop', this.handleDrop)
  }
  render() {
    return (
      <div name="0"
        style={{display: 'table-cell', position: 'relative', verticalAlign: 'middle'}}
        ref={this.dropRef}
      >
        {this.state.dragging &&
          <div name="1"
            style={{
              border: 'dashed grey 4px',
              backgroundColor: 'rgba(255,255,255,.8)',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 9999
            }}
          >
            <div name="2"
              style={{
                position: 'absolute',
                top: '50%',
                right: 0,
                left: 0,
                textAlign: 'center',
                color: 'grey',
                fontSize: 36
              }}
            >
             <div name="3">drop here :)</div>
            </div>
          </div>
        }
        {this.props.children}
      </div>
    )
  }
}
export default DragAndDrop;

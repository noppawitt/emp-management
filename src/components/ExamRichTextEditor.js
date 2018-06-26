import React, { Component } from 'react';
import ReactDrafts from 'react-drafts';
import '../../node_modules/react-drafts/dist/react-drafts.css';

export default class ExamRichTextEditor extends Component {
  constructor(props) {
    super(props);

    this.state = { isClear: false };

    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleSave = this.handleSave.bind(this);

    setInterval(this.handleSave, 1200);
  }

  handleFileUpload(file) {
    return Promise.resolve({
      src: file.preview,
      name: file.name
    });
  }

  handleSave() {
    this.setState({}, () => {
      this.editor.save().then((content) => {
        localStorage.setItem('examQuestion', content);

        setTimeout(() => { }, 1000);
      });
    });
  }

  render() {
    const storedContent = this.props.quiz;
    if (!this.state.isClear) {
      localStorage.removeItem('examQuestion');
      this.setState({ isClear: true });
    }

    return (
      <div className="demo-editor">
        <header size="small"><strong>Question<label style={{ color: '#c62921' }}> *</label></strong></header>
        <div style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: '#e2e2e2', borderRadius: '5px' }}>
          <ReactDrafts
            ref={(editor) => { this.editor = editor; }}
            content={storedContent}
            onFileUpload={this.handleFileUpload}
            allowPhotoLink={true}
            allowPhotoSizeAdjust={true}
            linkInputAcceptsFiles={true}
            spellcheckEnabled={false}
            customControls={['bold', 'italic', 'underline', 'quotes', 'bulletList', 'orderedList', 'alignLeft', 'alignCenter', 'alignRight', 'photo']}
            exportTo="html"
          />
        </div>
        <br />
      </div>
    );
  }
}

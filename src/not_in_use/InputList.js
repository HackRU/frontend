//InputList.js
import { React } from 'react';

class InputList extends React.Component {

  //Takes in a structured object to render as a text-input list

  render() {

    const className = this.props.data['className'];
    const onChange = this.props.onChange;
    const mentorInfo = this.props.mentorInfo;
    const items = this.props.data['items']
      .map((itemData) => (
        React.createElement(InputItem, {

          title: itemData['title'],
          id: itemData['id'],
          name: itemData['name'],
          onChange: onChange,
          value: mentorInfo[itemData['value']],
          htmlFor: itemData['htmlFor']
        })));

    return (
      <div className={className}>
        <div>
          {items}
        </div>
      </div>
    );
  
  }

}

class InputItem extends React.Component {

  //The Input Item to render in the list
  render() {
    return (
      <div>
        <label htmlFor={this.props.htmlFor}>
          {this.prop.title}
        </label>
        <textarea id={this.props.id}
          name={this.props.name}
          onChange={this.props.onChange}
          value={this.props.value}
          required
        />
      </div>
    );
  
  }
}

export default InputList;

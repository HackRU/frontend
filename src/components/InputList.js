//InputList.js
import { React } from 'react';




class InputList extends React.Component { 


  render() {

    var className = this.props.data['className'];
    var prompt = this.props.data['prompt'];
    var items = this.props.data['items']
      .map((itemData) => (
        React.createElement(InputItem, {
          title: itemData['title'],
          id: itemData['id'],
          name: itemData['name'],
          type: itemData['type'],
          value: itemData['value'],
          htmlFor: itemData['htmlFor']
        })
      ));

    return (
      <div className={className}>
        {prompt}<br />
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
        <input id={this.props.id}
          name={this.props.name}
          type={this.props.type}
          value={this.props.value}
        />
        <label htmlFor={this.props.htmlFor}>
          {this.props.title}
        </label>
        <br />
      </div>
    );
  }
}

export default InputList;

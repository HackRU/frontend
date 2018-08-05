//ClickList.js
import { React } from 'react';


class ClickList extends React.Component { 

  //Takes in a structured object to render as an interactive list, e.g. list of radio inputs or checkbox inputs

  render() {

    const className = this.props.data['className'];
    const prompt = this.props.data['prompt'];
    const items = this.props.data['items']
      .map((itemData) => (
        React.createElement(ClickItem, {
    
          title: itemData['title'],
          id: itemData['id'],
          name: itemData['name'],
          type: itemData['type'],
          value: itemData['value'],
          htmlFor: itemData['htmlFor']
        })));
    
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

class ClickItem extends React.Component {
  
  //The Click Item to render in the list
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

export default ClickList;

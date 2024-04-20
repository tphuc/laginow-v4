import React, { Component } from 'react';

import './index.css';

interface Props {
  items: any[];
  onSelectItem?: (selectedItem: number) => void;
}

interface State {
  selectedItem: number | null;
}

export default class Wheel extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedItem: null,
    };
    this.selectItem = this.selectItem.bind(this);
  }

  selectItem() {
    if (this.state.selectedItem === null) {
      const selectedItem = Math.floor(Math.random() * this.props.items.length);
      if (this.props.onSelectItem) {
        this.props.onSelectItem(selectedItem);
      }
      this.setState({ selectedItem });
    } else {
      this.setState({ selectedItem: null });
      setTimeout(this.selectItem, 200);
    }
  }

  render() {
    const { selectedItem } = this.state;
    const { items } = this.props;

    const wheelVars: any = {
      '--nb-item': items.length,
      '--selected-item': selectedItem!,
    };
    const spinning = selectedItem !== null ? 'spinning' : '';

    return (
      <div className="wheel-container">
        <div className={`wheel ${spinning}`} style={wheelVars} onClick={this.selectItem}>
          {items?.map?.((item, index) => {
            const style: any = { '--item-nb': index }
            return <div className="wheel-item" key={index} style={style}>
              {item}
            
            </div>
  })}
        </div>
      </div>
    );
  }
}

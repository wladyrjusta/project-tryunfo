import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '',
    cardAttr2: '',
    cardAttr3: '',
    cardImage: '',
    cardRare: '',
    cardTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    cardList: [],
  };

  validateForm = () => {
    const maxAttrSum = 210;
    const maxAttr = 90;
    const minAttr = 0;
    const { cardName, cardDescription, cardAttr1,
      cardAttr2, cardAttr3, cardImage,
      cardRare } = this.state;

    const stringsValidation = (cardName.length === 0 || cardDescription.length === 0
      || cardImage.length === 0 || cardRare.length === 0);

    const attrsValidation = (
      Number(cardAttr1) < minAttr
      || Number(cardAttr2) < minAttr
      || Number(cardAttr3) < minAttr
      || Number(cardAttr1) > maxAttr
      || Number(cardAttr2) > maxAttr
      || Number(cardAttr3) > maxAttr
      || (Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3) > maxAttrSum));

    if (stringsValidation || attrsValidation) {
      this.setState({ isSaveButtonDisabled: true });
    } else {
      this.setState({ isSaveButtonDisabled: false });
    }
  };

  getChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.validateForm);
  };

  hasTrunfo = () => {
    const { cardList } = this.state;

    this.setState({ hasTrunfo: cardList
      .some((card) => card.cardTrunfo === true) });
  };

  onSaveButtonClick = () => {
    const { cardName, cardDescription, cardAttr1,
      cardAttr2, cardAttr3, cardImage,
      cardRare, cardTrunfo } = this.state;

    this.setState((prevstate) => ({
      cardList: [...prevstate.cardList, { cardName,
        cardDescription,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardImage,
        cardRare,
        cardTrunfo }],
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    }), this.hasTrunfo);
  };

  removeCard = (cardIndex) => {
    const { cardList } = this.state;
    const filteredCards = cardList
      .filter((_card, index) => (index !== cardIndex));

    this.setState({ cardList: filteredCards }, this.hasTrunfo);
  };

  render() {
    const { cardName, cardDescription, cardAttr1,
      cardAttr2, cardAttr3, cardImage,
      cardRare, cardTrunfo, hasTrunfo, isSaveButtonDisabled, cardList } = this.state;

    return (
      <main
        className="main-container"
      >
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardImage={ cardImage }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardRare={ cardRare }
          hasTrunfo={ hasTrunfo }
          cardTrunfo={ cardTrunfo }
          onInputChange={ this.getChange }
          onSaveButtonClick={ this.onSaveButtonClick }
          isSaveButtonDisabled={ isSaveButtonDisabled }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardImage={ cardImage }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        <h1>Todas as cartas</h1>
        { cardList.map((card, index) => (
          <>
            <Card
              key={ card.cardName }
              cardName={ card.cardName }
              cardDescription={ card.cardDescription }
              cardImage={ card.cardImage }
              cardAttr1={ card.cardAttr1 }
              cardAttr2={ card.cardAttr2 }
              cardAttr3={ card.cardAttr3 }
              cardRare={ card.cardRare }
              cardTrunfo={ card.cardTrunfo }
            />
            <button
              data-testid="delete-button"
              id={ index }
              type="button"
              onClick={ () => this.removeCard(index) }
            >
              x
            </button>
          </>))}
      </main>
    );
  }
}

export default App;

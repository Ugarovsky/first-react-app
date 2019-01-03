const myNews = [
    {
      id: 1,
      author: 'Саша Печкин',
      text: 'В четверг, четвертого числа...',
      bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
    },
    {
      id: 2,
      author: 'Просто Вася',
      text: 'Считаю, что $ должен стоить 35 рублей!',
      bigText: 'А евро 42!'
    },
    {
      id: 3,
      author: 'Max Frontend',
      text: 'Прошло 2 года с прошлых учебников, а $ так и не стоит 35',
      bigText: 'А евро опять выше 70.'
    },
    {
      id: 4,
      author: 'Гость',
      text: 'Бесплатно. Без смс, про реакт, заходи - https://maxpfrontend.ru',
      bigText: 'Еще есть группа VK, telegram и канал на youtube! Вся инфа на сайте, не реклама!'
    }
  ];

  class Add extends React.Component { 
      state = {
          name: '',
          text:'',
          agree: false,
      }
      onNameChange = (e) =>{
          this.setState({name: e.currentTarget.value})
      }
      onTextChange = (e) =>{
          this.setState({text: e.currentTarget.value})
      }
      onCheckBoxAgree = (e) =>{
        console.log(this.state.name);
        if (this.state.name.trim() && this.state.text.trim() ){
        this.setState({ agree: e.currentTarget.checked })
        }
        else{
          alert("Заполните пожалуйста поля!");
        }
      }
      onBtnClickHandler = () =>{
          alert(this.state.text + '\n' + this.state.name);
      }
         render(){
             const {name,text} = this.state;
        return (      
            <form className='add'>        
            <input type='text' onChange={this.onNameChange} className='add__author' placeholder='Ваше имя' />        
            <textarea className='add__text' onChange={this.onTextChange} placeholder='Текст новости' />        
            <label className='add__checkrule'>          
            <input type='checkbox' onChange={this.onCheckBoxAgree}/> Я согласен с правилами        
            </label>
            {
                this.state.agree ? <button className='add__btn' onClick={this.onBtnClickHandler}>Показать alert</button> : null
            }        

            </form>    
            )}
        }
  class Article extends React.Component {
    state = {
      visible: false,
    }
    handleReadMoreClck = (e) => {
      e.preventDefault()
      this.setState({ visible: true })
    }
    render() {
      const { author, text, bigText } = this.props.data
      const { visible } = this.state
      return (
        <div className='article'>
          <p className='news__author'>{author}:</p>
          <p className='news__text'>{text}</p>
          {
            !visible && <a onClick={this.handleReadMoreClck} href="#" className='news__readmore'>Подробнее</a>
          }
          {
            visible && <p className='news__big-text'>{bigText}</p>
          }
        </div>
      )
    }
  }
  Article.propTypes = {
    data: PropTypes.shape({
      author: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      bigText: PropTypes.string.isRequired
    })
  }
  class News extends React.Component {
    handleCounter = () => {
      this.setState({ counter: ++this.state.counter })
    }
    renderNews = () => {
      const { data } = this.props
      let newsTemplate = null
      
      if (data.length) {
        newsTemplate = data.map(function(item) {
          return <Article key={item.id} data={item}/>
        })
      } else {
        newsTemplate = <p>К сожалению новостей нет</p>
      }
      
      return newsTemplate
    }
    render() {
      const { data } = this.props
      
      return (
        <div className='news'>
          {this.renderNews()}
          {
            data.length ? <strong onClick={this.handleCounter} className={'news__count'}>Всего новостей: {data.length}</strong> : null
          }
        </div>
      );
    }
  }
  News.propTypes = {
    data: PropTypes.array.isRequired
  }
  const App = () => {
    return (
      <React.Fragment>
        <h3>Новости</h3>
        <News data={myNews}/>
        <Add/>
      </React.Fragment>
    )
  }
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
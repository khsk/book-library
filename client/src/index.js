const React          = require('react');
const ReactDOM       = require('react-dom');
const MicroContainer = require('react-micro-container').default;
const request = require('superagent');

const MyNav       = require('./navbar.jsx');
const BookBox     = require('./bookBox.jsx');
const CommentItem = require('./commentItem.jsx');
const Processing  = require('./processing.jsx');

class Main extends MicroContainer {
  constructor(props) {
    super(props);
    this.state = {
      url:'/books/list',
      param: {},
      page: '',
      comments:[],

      show:false,
      now:0,

      showBookRequestFormModal:false,
    };
  }

  componentDidMount() {
    this.subscribe({
      BookSearch: this.handleBookSearch,
      ShowPendingBooks : this.handleShowPendingBooks,
      GetBookComments: this.handleGetBookComments,
      ChangeStatus : this.handleChangeStatus,
      ShowComments: this.handleShowComments,
      AddComment: this.handleAddComment,
      Processing: this.handleProcessing,

      AddBookRequest: this.handleAddBookRequest,
      ShowBookRequestFormModal:this.handleShowBookRequestFormModal,
      CloseBookRequestFormModal:this.handleCloseBookRequestFormModal,
      ISBNCompletion: this.handleISBNCompletion,
    });
  }

  getAuthenticityToken() {
    return (() => {
        var token;
        return (() => {
           return token ? token : token = document.querySelector('[name="csrf-token"]').content;
        })();
    })();
  }

  handleBookSearch(keyword) {
    console.log('handleBookSearch fire', keyword);
    this.setState({
        url:'/books/search',
        param:{keyword:keyword},
        page: '',
    });
  }

  handleShowPendingBooks() {
    this.setState({
        url:'/books/pending',
        param:{status:'申請中'},
        page: '',
    });
  }

  handleChangeStatus(key, id) {
    const STATUS = ['', '申請中', '存在', '貸出中', '廃棄'];
    const url = '/books/changeStatus'
    request.post(url).set('X-CSRF-Token', this.getAuthenticityToken())
    .send({
      data:{status:STATUS[key], id:id}
    }).end(function(err, res){
        this.handleProcessing(true, 50)
        if(err) {
          console.log('error')
          console.log(res)
          alert(err);
          this.handleProcessing(true, 100)
          this.handleProcessing(false, 0)
          return;
        }
        console.log('success')
        console.log(res)
        this.handleProcessing(true, 100)
        this.handleProcessing(false, 0)
    }.bind(this)).type('json');


    this.handleProcessing(true, 30)
  }

  handleGetBookComments(component) {
    const url = '/books/comments';
    if (component.state.commentOpen) {
      component.setState({
        commentOpen:!component.state.commentOpen,
      });
      return;
    }
    this.handleProcessing(true, 10)
    request.get(url)
    .query({book_id:component.props.book.id})
    .end( function(err, res) {
      this.handleProcessing(true, 50)
      if (err) {
        console.error(url, res, err.toString());
      } else { 
        component.setState({comments: JSON.parse(res.text),
                       commentOpen:!component.state.commentOpen,
        });
      }
      this.handleProcessing(true, 100)
      this.handleProcessing(false, 0)
    }.bind(this))
    .type('json')
    this.handleProcessing(true, 30)
  }

  handleShowComments() {
    this.handleProcessing(true, 10)
    const url = '/comments/includeBookIndex';
    request.get(url)
    .end( function(err, res) {
      this.handleProcessing(true, 50)
      if (err) {
        console.error(url, res, err.toString());
      } else { 
      this.setState({
        comments: JSON.parse(res.text),
        page: 'comments',
      })
      }
      this.handleProcessing(true, 100)
      this.handleProcessing(false, 0)
    }.bind(this))
    .type('json')
    this.handleProcessing(true, 30)
  }

  handleAddComment(formData) {
    this.handleProcessing(true, 10)
    const url = '/comments/add'

      request.post(url).set('X-CSRF-Token', this.getAuthenticityToken()).send({data:formData}).end(function(err, res){

        this.handleProcessing(true, 50)
        if(err) {
          console.log('error')
          console.log(res)
        alert(err);
          this.handleProcessing(true, 100)
          this.handleProcessing(false, 0)
          return;
        }
        console.log('success')
        console.log(res)
        alert('Success!! \n Sorry,Please reopen comments');
        this.forceUpdate();
        this.handleProcessing(true, 100)
        this.handleProcessing(false, 0)
      }.bind(this)).type('json');
    

    this.handleProcessing(true, 30)
  }

  handleAddBookRequest(formData) {
    this.handleProcessing(true, 10)
    const url = '/books/addRequest'
    formData.status = '申請中'

    request.post(url).set('X-CSRF-Token', this.getAuthenticityToken()).send({data:formData}).end(function(err, res){
      this.handleProcessing(true, 50)
      if(err) {
        console.log('error')
        console.log(res)
        alert(err);
        this.handleProcessing(true, 100)
        this.handleProcessing(false, 0)
        this.handleCloseBookRequestFormModal();
        return;
      }
      console.log('success')
      console.log(res)
      this.handleProcessing(true, 100)
      this.handleProcessing(false, 0)
      this.handleCloseBookRequestFormModal();
    }.bind(this)).type('json');
    this.handleProcessing(true, 30)
  }

  handleISBNCompletion(isbn, component) {
    this.handleProcessing(true, 10)
    const url = '/books/add'
    const ndl = 'https://iss.ndl.go.jp/api/sru?operation=searchRetrieve&query=isbn=' + isbn.toString()
    const hanmoto = 'http://www.hanmoto.com/api/book.php?ISBN=' + isbn.toString()
    console.log('ndlurl',ndl)
    request.get('http://query.yahooapis.com/v1/public/yql').query({q:'select * from xml where url="' + hanmoto + `"`, format:'json'}).end(function(err, res) {
      this.handleProcessing(true, 40)
      console.log('ndl end')
      if(err) {
        console.log('error')
        console.log(res)
        alert(err);
        this.handleProcessing(true, 100)
        this.handleProcessing(false, 0)
        return;
      }
      this.handleProcessing(true, 50)
      console.log('ndl', res)
      const data = res.body.query.results.HandotAPI;
      console.log('HandotAPI', data)
      if (data.Head.error || data.Head.count == 0) {
         console.log('isbn length end')
         this.handleProcessing(true, 100)
         this.handleProcessing(false, 0)
         return;
      }
      this.handleProcessing(true, 60)
      const product = data.Book.Product;
      const contributor = product.DescriptiveDetail.Contributor
      const publishingDate = product.PublishingDetail.PublishingDate

      console.log(Array.isArray(publishingDate) ? publishingDate[0].Date.content : publishingDate.Date)

      component.setState({
        title:product.DescriptiveDetail.TitleDetail.TitleElement.TitleText.content,
        author : Array.isArray(contributor) ? contributor[0].PersonName : contributor.PersonName,
        published_date: Array.isArray(publishingDate) ? publishingDate[0].Date.content : publishingDate.Date,
      });
      this.handleProcessing(true, 100)
      this.handleProcessing(false, 0)
    }.bind(this)).type('json')
    this.handleProcessing(true, 30)
  }

  handleProcessing(show, now) {
    this.setState({
        show:show,
        now:now,
    })
  }


  handleShowBookRequestFormModal() {
    console.log('handleShowBookRequestFormModal')
    this.setState({
      showBookRequestFormModal:true,
    });
    console.log(this.state);
  }

  handleCloseBookRequestFormModal() {
    console.log('handleCloseBookRequestFormModal')
    this.setState({
      showBookRequestFormModal:false,
    });
    console.log(this.state);
  }


  render() {
    if(!this.state.page) {
      return (
        <div>
         <MyNav dispatch={this.dispatch} {...this.state}/>
         <BookBox {...this.state} dispatch={this.dispatch} />
         <Processing show={this.state.show} now={this.state.now}/>
       </div>
      );
    } else if(this.state.page = 'comments') {
      const comments = this.state.comments.map(function(comment, index) {
        return ( 
          <div key={index}>
            {/* プレースホルダーリンク上でカーソルをpointerにしたいがためにrole属性追加 */}
            <h3><a role="button" onClick={ 
              ()=> {
                    this.dispatch('BookSearch', comment.book.title)
              }}>{comment.book.title}</a></h3>
            <CommentItem comment={comment} key={comment.id} />
          </div>
           )
      }.bind(this));
      return (
        <div>
         <MyNav dispatch={this.dispatch} {...this.state}/>
         <div className="container">
           {comments}
         </div>
         <Processing  show={this.state.show} now={this.state.now}/>
       </div>
        );
    }
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('container')
);

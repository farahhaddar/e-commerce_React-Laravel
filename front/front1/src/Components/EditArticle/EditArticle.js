import React, { useEffect, useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Button, Form } from "react-bootstrap";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./style.css";
import { Redirect } from "react-router-dom";
import draftToHtml from "draftjs-to-html";
import { useParams, useHistory } from "react-router-dom";
// import "./style.css";
import ReactHtmlParser from "react-html-parser";

import htmlToDraft from "html-to-draftjs";

const token = localStorage.getItem("token");

const EditArticle = () => {
  const [ArtCat, setArtCat] = useState([]);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(ContentState.createFromText("Hello"))
  );
  const [title, setTitle] = useState("");
  const [Redirect, setRedirect] = useState("false");
  const [RedirectAdmin, setRedirectAdmin] = useState("false");

  const handleTitleChange = (state) => {
    setTitle(state.target.value);

    console.log(state.target.value);
  };

  const handleEditorChange = (state) => {
    setEditorState(state);
    console.log(draftToHtml(convertToRaw(state.getCurrentContent())));

    console.log(state.getCurrentContent().getPlainText());
  };
  const { id } = useParams();

  const submit = (e) => {
    e.preventDefault();

    if (title == "") alert("Title field required");
    if (editorState.getCurrentContent().getPlainText() == "")
      alert("Content is required");
    let formData = new FormData();
    formData.append(
      "article_category_id",
      document.getElementById("assign").value
    );
    formData.append("title", title);
    // formData.append("content", editorState.getCurrentContent().getPlainText());
    formData.append(
      "content",
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
    formData.append("_method", "PUT");

    fetch(`http://localhost:8000/api/admin/articles/${id}`, {
      method: "post",
      body: formData,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status == 200) {
          alert("Edited Succ");
          clearForm();
          window.location.replace("/admin/articles");
        } else {
          if (res.status == "Not authorized")
            window.location.replace("/admin/login");
          else {
            console.log(res);
            alert(res.error.message[Object.keys(res.error.message)][0]);
          }
        }
      });
  };
  const clearForm = () => {
    setEditorState(EditorState.createEmpty());
    setTitle("");
  };

  useEffect(() => {
    try {
      window.scrollTo(0, 0);
      fetch("http://localhost:8000/api/articlesCategories", {
        method: "get",
        headers: {},
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          if (json.status == 200) {
            console.log(json.data);
            setArtCat(json.data);
          }
        });
    } catch (err) {
      console.log(err);
    }

    try {
      fetch(`http://localhost:8000/api/articles/${id}`, {
        method: "get",
        headers: {},
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          if (json.status == 200) {
            console.log(json.data);
            setTitle(json.data.title);

            const contentBlock = htmlToDraft(json.data.content);
            if (contentBlock) {
              const contentState = ContentState.createFromBlockArray(
                contentBlock.contentBlocks
              );
              const editorState = EditorState.createWithContent(contentState);
              setEditorState(editorState);
            }
          }
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  let ArtCatOption = [];
  if (ArtCat.data)
    if (ArtCat.data[0] != undefined) {
      for (let i = 0; i < ArtCat.data.length; i++) {
        ArtCatOption.push(
          <option value={ArtCat.data[i].id}>{ArtCat.data[i].name}</option>
        );
      }
    }
  // console.log(ArtCat.data.length);

  if (Redirect == "true") {
    // return <Redirect to="/admin/articles" />;
  }
  if (RedirectAdmin == "true") {
    console.log("okkkkkkkkk");
    // return <Redirect to="/admin/login" />;
  }

  return (
    <div className="App">
      <h2 className="text-center">
        <b>Add new Article</b>
      </h2>
      <header className="App-header mb-4 pp">
        <b>Title</b>
      </header>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <input
          className="mb-4 inp"
          type="text"
          value={title}
          onChange={handleTitleChange}
        ></input>

        <Button onClick={submit}>Save</Button>
      </div>
      <div className="mb-4" style={{ maxWidth: "25%" }} id="select">
        <p className="pp">
          <b>Select Article Category</b>
        </p>
        <Form.Control as="select" custom id="assign">
          {ArtCatOption}
        </Form.Control>
      </div>
      <header className="App-header mb-4 pp">
        <b>Content</b>
      </header>

      <Editor
        editorState={editorState}
        // defaultEditorState={defaultEditorState}
        editorStyle={{ backgroundColor: "white", height: "75vh" }}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      ></Editor>
    </div>
  );
};
export default EditArticle;

//   handleSubmit(e) {
//     e.preventDefault();

//     const data = {
//       content: this.state.editorState,
//     };

//     axios.post("http://localhost:5555/posts", { data }).then((res) => {
//       console.log(data);
//     });

//     this.setState({ editorState: EditorState.createEmpty() });
//   }
//   render() {
//     return (
//       <div>
//         <h5>Create document</h5>
//         <Editor
//           editorState={this.state.editorState}
//           editorStyle={{
//             height: "60vh",
//             backgroundColor: "white",
//             marginBottom: "5px",
//           }}
//           wrapperClassName="demo-wrapper"
//           editorClassName="demo-editor"
//           onEditorStateChange={this.onEditorStateChange}
//         />
//         <button
//           onClick={this.handleSubmit}
//           className="btn-large waves-effect waves-light xbutton"
//         >
//           Save
//         </button>
//       </div>
//     );
//   }
// }

// export default AddArticle;

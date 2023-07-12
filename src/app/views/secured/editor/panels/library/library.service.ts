import { Attribute, Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { EditorService } from '../../editor.service';
@Injectable()
export class LibraryService {
  private dropComponents: any = {
    page: `
    <div id="" data-item-border="1" class="h-100 w-100" style="display: flex; flex-direction: column;">
      <header id="" data-item-border="1" class="" style="background-color: #6c757d; min-height: 50px;"></header>
      <main id="" data-item-border="1" class="no-gutters"
      style="display: flex; flex-wrap: wrap; flex: 1 0 auto; padding: 0; width: 100%">
      </main>
      <footer id="" data-item-border="1" class="" style="background-color: #f8f9fa; min-height: 50px"></footer>
    </div>`,
    container: `
    <div id="" data-item-border="1" class="no-gutters" style="width: 100%; height: 250px; min-height: 250px;">
    </div>
    `,
    iframe: `
    <iframe id="" data-item-border="1"
    seamless
    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
    src=""
    class="container"
    style="height: fit-content;
           background-color: #fafafa;
           color: #000000;
           width: fit-content;
           border: none;"></iframe>
    `,
    textRight: `
    <div id=""
         data-item-border="1" class="container" style="height: fit-content">
      <h1 id="" data-item-border="1" class="my-4">
        Content Heading
      </h1>
      <div id="" data-item-border="1" class="row">
        <div id="" data-item-border="1" class="col-md-7">
          <div id="" data-item-border="1">
            <img id=""
            data-item-border="1"
            class="img-fluid rounded mb-3 mb-md-0" src="//placehold.it/640x360/dcdcdc/fff/image1.jpg&text=Image Left" alt="">
          </div>
        </div>
        <div id="" data-item-border="1" class="col-md-5">
          <h3 id="" data-item-border="1">Content Body</h3>
          <p id="" data-item-border="1">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Laudantium veniam exercitationem expedita laborum at voluptate.
            Labore, voluptates totam at aut nemo deserunt rem magni pariatur.
          </p>
          <button id="" data-item-border="1" class="btn btn-primary"><span id="" data-item-border="1">Button</span></button>
        </div>
      </div>
    </div>
    `,
    textLeft: `
    <div id="" data-item-border="1" class="container" style="height: fit-content">
      <h1 id="" data-item-border="1" class="my-4">
        Content Heading
      </h1>
      <div id="" data-item-border="1" class="row">
        <div id="" data-item-border="1" class="col-md-5">
          <h3 id="" data-item-border="1">Content Body</h3>
          <p id="" data-item-border="1">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Laudantium veniam exercitationem expedita laborum at voluptate.
            Labore, voluptates totam at aut nemo deserunt rem magni pariatur.
          </p>
          <button id=""
          data-item-border="1"
          class="btn btn-primary"><span id="" data-item-border="1">Button</span></button>
        </div>
        <div id="" data-item-border="1" class="col-md-7">
          <div id="" data-item-border="1">
            <img id=""
            data-item-border="1"
            class="img-fluid rounded mb-3 mb-md-0" src="//placehold.it/640x360/dcdcdc/fff/image1.jpg&text=Image Right" alt="">
          </div>
        </div>
      </div>
    </div>
    `,
    jumbotron: `
    <div id="" data-item-border="1" class="jumbotron">
      <h1 id="" data-item-border="1">Hello, world!</h1>
      <p id="" data-item-border="1">
        This is an example to show the potential of an offcanvas layout pattern in Bootstrap.
        Try some responsive-range viewport sizes to see it in action.
      </p>
    </div>
    `,
    row2column: `
    <div id="" data-item-border="1" class="row w-100 p-0 m-0" style="flex-wrap: nowrap; width: 100%; min-height: 25%;">
      <div id="" data-item-border="1" class="p-2" style="width: 50%;"></div>
      <div id="" data-item-border="1" class="p-2" style="width: 50%;"></div>
    </div>`,
    row3column: `
    <div id="" data-item-border="1" class="row w-100 p-0 m-0" style="width: 100%; min-height: 25%;">
      <div id="" data-item-border="1" class="col-4 p-2"></div>
      <div id="" data-item-border="1" class="col-4 p-2"></div>
      <div id="" data-item-border="1" class="col-4 p-2"></div>
    </div>`,
    info_card: `
    <div id="" data-item-border="1" class="card mb-4">
      <div id="" data-item-border="1">
        <img id="" data-item-border="1" class="card-img-top" src="//placehold.it/640x360/dcdcdc/fff/image1.jpg&text=Card Image" alt="">
      </div>
      <div id="" data-item-border="1" class="card-body">
        <h4 id="" data-item-border="1" class="card-title">
          <div id="" data-item-border="1">Card Title</div>
        </h4>
        <p id="" data-item-border="1" class="card-text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Amet numquam aspernatur eum quasi sapiente nesciunt?
          Voluptatibus sit, repellat sequi itaque deserunt, dolores in, nesciunt, illum tempora ex quae? Nihil, dolorem!
        </p>
      </div>
    </div>
    `,
    text_input: `<div class="form-floating mb-3" >
    <input type="text" class="form-control" id="floatingInput"  placeholder="Type here..." name="">
    <label for="floatingInput">Label</label>
  </div>`,
    price_card: `
    <div id="" data-item-border="1" class="card mb-4 shadow-sm" style="text-align: center!important;">
      <div id="" data-item-border="1" class="card-header">
        <h4 id="" data-item-border="1" class="my-0 font-weight-normal">Pricing</h4>
      </div>
      <div id="" data-item-border="1" class="card-body">
        <h1 id="" data-item-border="1" class="card-title pricing-card-title">$00 <small class="text-muted">/ mo</small></h1>
        <ul id="" data-item-border="1" class="list-unstyled mt-3 mb-4">
          <li id="" data-item-border="1">List Item One</li>
          <li id="" data-item-border="1">List Item Two</li>
          <li id="" data-item-border="1">List Item Three</li>
          <li id="" data-item-border="1">List Item Four</li>
        </ul>
        <button id=""
        data-item-border="1"
        type="button" class="btn btn btn-block btn-primary">
          <span id="" data-item-border="1">Get started</span>
        </button>
      </div>
    </div>
    `,
    card_deck: `
    <div id="" data-item-border="1" class="card-deck">
      <div id="" data-item-border="1" class="card">
        <img id="" data-item-border="1" class="card-img-top"
        src="//placehold.it/640x360/dcdcdc/fff/image1.jpg&text=Image&fontsize=16 Placeholder"
        alt="Card image cap">
        <div id="" data-item-border="1" class="card-body">
          <h5 id="" data-item-border="1" class="card-title">Card title</h5>
          <p id="" data-item-border="1" class="card-text">
          This is a wider card with supporting text below as a natural lead-in to additional content.
          This content is a little bit longer.
          </p>
        </div>
        <div id="" data-item-border="1" class="card-footer">
          <small id="" data-item-border="1" class="text-muted">This is card footer text.</small>
        </div>
      </div>
      <div id="" data-item-border="1" class="card">
        <img id="" data-item-border="1" class="card-img-top"
        src="//placehold.it/640x360/dcdcdc/fff/image1.jpg&text=Image&fontsize=16 Placeholder"
        alt="Card image cap">
        <div id="" data-item-border="1" class="card-body">
          <h5 id="" data-item-border="1" class="card-title">Card title</h5>
          <p id="" data-item-border="1" class="card-text">
          This is a wider card with supporting text below as a natural lead-in to additional content.
          This content is a little bit longer.
          </p>
        </div>
        <div id="" data-item-border="1" class="card-footer">
          <small id="" data-item-border="1" class="text-muted">This is card footer text.</small>
        </div>
      </div>
      <div id="" data-item-border="1" class="card">
        <img id="" data-item-border="1" class="card-img-top"
        src="//placehold.it/640x360/dcdcdc/fff/image1.jpg&text=Image&fontsize=16 Placeholder"
        alt="Card image cap">
        <div id="" data-item-border="1" class="card-body">
          <h5 id="" data-item-border="1" class="card-title">Card title</h5>
          <p id="" data-item-border="1" class="card-text">
          This is a wider card with supporting text below as a natural lead-in to additional content.
          This content is a little bit longer.
          </p>
        </div>
        <div id="" data-item-border="1" class="card-footer">
          <small id="" data-item-border="1" class="text-muted">This is card footer text.</small>
        </div>
      </div>
    </div>
    `,
    card_group: `
    <div id="" data-item-border="1" class="card-group">
      <div id="" data-item-border="1" class="card">
        <img id="" data-item-border="1" class="card-img-top"
         src="//placehold.it/640x360/dcdcdc/fff/image1.jpg&text=Image&fontsize=16 Placeholder"
         alt="Card image cap">
        <div id="" data-item-border="1" class="card-body">
          <h5 id="" data-item-border="1" class="card-title">Card title</h5>
          <p id="" data-item-border="1" class="card-text">
            This is a wider card with supporting text below as a natural lead-in to additional content.
            This content is a little bit longer.
          </p>
        </div>
        <div id="" data-item-border="1" class="card-footer">
          <small id="" data-item-border="1" class="text-muted">This is card footer text.</small>
        </div>
      </div>
      <div id="" data-item-border="1" class="card">
        <img id="" data-item-border="1" class="card-img-top"
         src="//placehold.it/640x360/dcdcdc/fff/image1.jpg&text=Image&fontsize=16 Placeholder"
         alt="Card image cap">
        <div id="" data-item-border="1" class="card-body">
          <h5 id="" data-item-border="1" class="card-title">Card title</h5>
          <p id="" data-item-border="1" class="card-text">
            This is a wider card with supporting text below as a natural lead-in to additional content.
            This content is a little bit longer.
          </p>
        </div>
        <div id="" data-item-border="1" class="card-footer">
          <small id="" data-item-border="1" class="text-muted">This is card footer text.</small>
        </div>
      </div>
      <div id="" data-item-border="1" class="card">
        <img id="" data-item-border="1" class="card-img-top"
         src="//placehold.it/640x360/dcdcdc/fff/image1.jpg&text=Image&fontsize=16 Placeholder"
         alt="Card image cap">
        <div id="" data-item-border="1" class="card-body">
          <h5 id="" data-item-border="1" class="card-title">Card title</h5>
          <p id="" data-item-border="1" class="card-text">
            This is a wider card with supporting text below as a natural lead-in to additional content.
            This content is a little bit longer.
          </p>
        </div>
        <div id="" data-item-border="1" class="card-footer">
          <small id="" data-item-border="1" class="text-muted">This is card footer text.</small>
        </div>
      </div>
    </div>
    `,
    feature_card: `
    <div id="" data-item-border="1" class="card flex-row mb-4 box-shadow mb-4">
      <div id="" data-item-border="1" class="card-body d-flex flex-column align-items-start">
        <strong id="" data-item-border="1" class="d-inline-block mb-2 text-primary">Featured Card</strong>
        <h3 id="" data-item-border="1" class="mb-0">
          <div id="" data-item-border="1" class="text-dark">Featured post</div>
        </h3>
        <div id="" data-item-border="1" class="mb-1 text-muted">Post Subtitle</div>
        <p id="" data-item-border="1" class="card-text mb-auto">
        This is a wider card with supporting text below as a natural lead-in to additional content.
        </p>
        <button id="" data-item-border="1" class="btn btn-dark"><span id="" data-item-border="1">Continue reading</span></button>
      </div>
      <img id="" data-item-border="1" class="card-img-right flex-auto d-none d-block"
      alt="Thumbnail"
      style="width: 300px; height: 250px;"
      src="//placehold.it/640x360/dcdcdc/fff/image1.jpg&text=Image&fontsize=16 Image" data-holder-rendered="true">
    </div>
    `,
    profile_card: `
    <div id="" data-item-border="1" class="flex-row mb-4" style="text-align: center!important;">
       <img id=""
       data-item-border="1"
       class="rounded-circle"
       src="//placehold.it/640x360/dcdcdc/fff/image1.jpg&text=Card Image" alt="" width="140" height="140">
       <h2 id="" data-item-border="1">Heading</h2>
       <p id="" data-item-border="1">Donec sed odio dui.
          Etiam porta sem malesuada magna mollis euismod.
          Nullam id dolor id nibh ultricies vehicula ut id elit.
          Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          Praesent commodo cursus magna.
       </p>
       <p id="" data-item-border="1">
          <button id=""
                  data-item-border="1"
                  class="btn btn-secondary"
                  role="button"><span id="" data-item-border="1">View details »</span></button>
       </p>
     </div>
    `,
    text: `
    <p id="" data-item-border="1"
       spellcheck="true"
       style="">
        Some quick example text to build on the paragraph and make up the bulk of the content.
       </p>
    `,
    horizontal_rule: `
      <hr id="" data-item-border="1" class="" style="min-width: fit-content;" />
    `,
    button: `
      <button id=""
              data-item-border="1"
              class="btn btn-primary"
              style="height: fit-content;">Button</button>
    `,
    img: `
    <img
    name=""
    id="" data-item-border="1"
    class=""
    style="max-width: 100%; max-height: 100%"
    src="//placehold.it/640x360/dcdcdc/fff/image1.jpg&text=Image&fontsize=16 Placeholder">
    `,
    video: `
    <video id="" data-item-border="1"
           width="320" height="240"
           playsinline="playsinline"
           loop="loop"
           autoplay="autoplay"
           controls="controls"
           muted="muted">
      <source src="https://storage.googleapis.com/coverr-main/mp4/Nature-Sunset.mp4">
    </video>
    `,
    video_with_text: `
    <div id="" data-item-border="1"
      style="position: relative;
             background-color: black;
             height: 100%;
             width: 100%;
             overflow: hidden;">
      <video id="" data-item-border="1"
           width="100%" height="100%"
           playsinline="playsinline"
           loop="loop"
           autoplay="autoplay"
           controls="controls"
           muted="muted"
           style="position: absolute; z-index: 0;">
        <source src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4">
      </video>
      <div class="container h-100" style="position: relative; z-index: 2;">
        <div id="" data-item-border="1" class="d-flex h-100 text-center align-items-end">
          <div class="w-100 text-white">
            <h1 id="" data-item-border="1" class="w-100 display-3">Video Header</h1>
            <p id="" data-item-border="1" class="w-100 lead">Video with floating text.</p>
          </div>
        </div>
      </div>
    </div>
    `,
    imgGrid: `
    <div id="" data-item-border="1" class="container p-4">
      <div id="" data-item-border="1" class="row">
      <div id="" data-item-border="1" class="col-3 col-md-4 col-6">
        <div id="" data-item-border="1" class="d-block mb-4 h-100">
          <img id="" data-item-border="1"
          class="img-fluid img-thumbnail"
          src="//placehold.it/640x360/dcdcdc/fff/image1.jpg&text=Card Image" alt="">
        </div>
      </div>
      <div id="" data-item-border="1" class="col-3 col-md-4 col-6">
        <div id="" data-item-border="1" class="d-block mb-4 h-100">
          <img id="" data-item-border="1"
          class="img-fluid img-thumbnail"
          src="//placehold.it/640x360/dcdcdc/fff/image1.jpg&text=Card Image" alt="">
        </div>
      </div>
      <div id="" data-item-border="1" class="col-3 col-md-4 col-6">
        <div id="" data-item-border="1" class="d-block mb-4 h-100">
          <img id="" data-item-border="1"
          class="img-fluid img-thumbnail"
          src="//placehold.it/640x360/dcdcdc/fff/image1.jpg&text=Card Image" alt="">
        </div>
      </div>
      <div id="" data-item-border="1" class="col-3 col-md-4 col-6">
        <div id="" data-item-border="1" class="d-block mb-4 h-100">
          <img id="" data-item-border="1"
          class="img-fluid img-thumbnail"
          src="//placehold.it/640x360/dcdcdc/fff/image1.jpg&text=Card Image" alt="">
        </div>
      </div>
      <div id="" data-item-border="1" class="col-3 col-md-4 col-6">
        <div id="" data-item-border="1" class="d-block mb-4 h-100">
          <img id="" data-item-border="1"
          class="img-fluid img-thumbnail"
          src="//placehold.it/640x360/dcdcdc/fff/image1.jpg&text=Card Image" alt="">
        </div>
      </div>
      <div id="" data-item-border="1" class="col-3 col-md-4 col-6">
        <div id="" data-item-border="1" class="d-block mb-4 h-100">
          <img id="" data-item-border="1"
          class="img-fluid img-thumbnail"
          src="//placehold.it/640x360/dcdcdc/fff/image1.jpg&text=Card Image" alt="">
        </div>
      </div>
      <div id="" data-item-border="1" class="col-3 col-md-4 col-6">
        <div id="" data-item-border="1" class="d-block mb-4 h-100">
          <img id="" data-item-border="1"
          class="img-fluid img-thumbnail"
          src="//placehold.it/640x360/dcdcdc/fff/image1.jpg&text=Card Image" alt="">
        </div>
      </div>
      <div id="" data-item-border="1" class="col-3 col-md-4 col-6">
        <div id="" data-item-border="1" class="d-block mb-4 h-100">
          <img id=""
          data-item-border="1"
          class="img-fluid img-thumbnail"
          src="//placehold.it/640x360/dcdcdc/fff/image1.jpg&text=Card Image" alt="">
        </div>
      </div>
      </div>
    </div>
  `,
    carousel: `
    <div id="#demo" class="carousel slide pt-2 pb-2" data-ride="carousel" style="">
      <!-- Indicators
      <ul id="${uuidv4()}" class="carousel-indicators">
        <li data-target="#demo" data-slide-to="0" class="active"></li>
        <li data-target="#demo" data-slide-to="1"></li>
        <li data-target="#demo" data-slide-to="2"></li>
      </ul> -->
      <!-- The slideshow -->
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img id="${uuidv4()}" src="//placehold.it/640x360/#34495e/fff/image1.jpg&text=Image One" alt="">
          <div id="${uuidv4()} class="carousel-caption d-none d-md-block">
            <h5 id="${uuidv4()}>...</h5>
            <p id="${uuidv4()}>...</p>
          </div>
        </div>
        <div class="carousel-item">
          <img id="${uuidv4()}" src="//placehold.it/640x360/#34495e/fff/image1.jpg&text=Image Two" alt="">
          <div id="${uuidv4()} class="carousel-caption d-none d-md-block">
            <h5 id="${uuidv4()}>...</h5>
            <p id="${uuidv4()}>...</p>
          </div>
        </div>
        <div class="carousel-item">
          <img id="${uuidv4()}" src="//placehold.it/640x360/#34495e/fff/image1.jpg&text=Image Three" alt="">
          <div id="${uuidv4()} class="carousel-caption d-none d-md-block">
            <h5 id="${uuidv4()}>...</h5>
            <p id="${uuidv4()}>...</p>
          </div>
        </div>
      </div>
      <!-- Left and right controls
      <a id="${uuidv4()}" class="carousel-control-prev" href="#demo" data-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </a>
      <a id="${uuidv4()}" class="carousel-control-next" href="#demo" data-slide="next">
        <span class="carousel-control-next-icon"></span>
      </a>-->
    </div>
    `,
    checkbox: `<div class="form-check">
    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
    <label class="form-check-label" for="flexCheckDefault">
      Default checkbox
    </label>
  </div>`,

    radiobutton: `<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
  <label class="form-check-label" for="flexRadioDefault1">
    Default radio
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
  <label class="form-check-label" for="flexRadioDefault2">
    Default checked radio
  </label>
</div>`,
    dropdown: `<div class="dropdown">
<button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
  Dropdown button
</button>
<ul class="dropdown-menu">
  <li><a class="dropdown-item" href="#">Action</a></li>
  <li><a class="dropdown-item" href="#">Another action</a></li>
  <li><a class="dropdown-item" href="#">Something else here</a></li>
</ul>
</div>`,
    loading: `<div><i class="fas fa-spinner fa-spin"></i></div>`,
    icon: `<div><i class="fas fa-star"></i></div>`,
  };

  constructor(private editerSer:EditorService) { }

  public component(type: string) {
    // turn the string to HTML
    const droppedEle2HTML: DocumentFragment = document
      .createRange()
      .createContextualFragment(this.dropComponents[type]);

    let selectBox = document.getElementById('select_box');
    let highlightBox = document.getElementById('highlight_box');
    let selectActions = document.getElementById('select_actions');
    let textEditor = document.getElementById('text_editor');
    // find all the IDs in the created HTML and update them.
    /* droppedEle2HTML.querySelectorAll('*[id]')
      .forEach((eleHtml: HTMLElement) => {
        if (type !== 'carousel') {
          eleHtml.id = uuidv4();
        }
        // add double click to all elements with IDs
        eleHtml.addEventListener('dblclick', (targetEleEvt: MouseEvent) => {
          const targetEle: HTMLElement = targetEleEvt.target as HTMLElement;
          targetEle.contentEditable = 'true';
          targetEle.style.display = 'inline-block';
          targetEle.style.outline = '0px solid transparent';
          targetEle.focus();
          selectActions ? selectActions.style.display = 'none' : "";
          textEditor ? textEditor.style.display = 'flex' : "";
          selectBox ? selectBox.style.border = '2px dotted #17a2b8' : "";

          // check as user edits content
          const onTextUpdate = (evt:any) => {
            const {height, left, top, width} = eleHtml.getBoundingClientRect();
            selectBox ? selectBox.style.width = `${width}px` : "";
            selectBox ? selectBox.style.height = `${height}px` : "";
            if(highlightBox){
              if (highlightBox.style.left === `${left}px` && highlightBox.style.top === `${top}px`) {
                highlightBox.style.width = `${width}px`;
                highlightBox.style.height = `${height}px`;
              }
            }
            
            evt.cancelBubble = true;
            evt.preventDefault();
          };
          eleHtml.addEventListener('input', onTextUpdate);
          eleHtml.addEventListener('paste', onTextUpdate);
          // when on blur/removed focus
          eleHtml.addEventListener('blur', () => {
            selectBox ? selectBox.style.border = '1px solid #17a2b8' : "";
          });
          //
          // targetEleEvt.cancelBubble = true;
          targetEleEvt.stopPropagation();
          targetEleEvt.preventDefault();
        });
      }); */

    droppedEle2HTML
      .querySelectorAll('*[id]')
      .forEach((value: Element, key: number, parent: NodeListOf<Element>) => {
        const eleHtml: any = value as HTMLElement;
        let count = 0;
        count += 1;
        if (type !== 'carousel') {
          eleHtml.name = "inputField_" + count
          console.log(eleHtml);
          this.editerSer.dragElement_1.subscribe()
          console.log(this.editerSer.dragElement_1);
          eleHtml.id = uuidv4();
        }
        // add double click to all elements with IDs
        eleHtml.addEventListener('dblclick', (targetEleEvt: MouseEvent) => {
          const targetEle: HTMLElement = targetEleEvt.target as HTMLElement;
          targetEle.contentEditable = 'true';
          targetEle.style.display = 'inline-block';
          targetEle.style.outline = '0px solid transparent';
          targetEle.focus();
          selectActions ? (selectActions.style.display = 'none') : '';
          textEditor ? (textEditor.style.display = 'flex') : '';
          selectBox ? (selectBox.style.border = '2px dotted #17a2b8') : '';

          // check as user edits content
          const onTextUpdate = (evt: any) => {
            const { height, left, top, width } =
              eleHtml.getBoundingClientRect();
            selectBox ? (selectBox.style.width = `${width}px`) : '';
            selectBox ? (selectBox.style.height = `${height}px`) : '';
            if (highlightBox) {
              if (
                highlightBox.style.left === `${left}px` &&
                highlightBox.style.top === `${top}px`
              ) {
                highlightBox.style.width = `${width}px`;
                highlightBox.style.height = `${height}px`;
              }
            }

            // evt.cancelBubble = true;
            evt.stopPropagation();
            evt.preventDefault();
          };
          eleHtml.addEventListener('input', onTextUpdate);
          eleHtml.addEventListener('paste', onTextUpdate);
          // when on blur/removed focus
          eleHtml.addEventListener('blur', () => {
            selectBox ? (selectBox.style.border = '1px solid #17a2b8') : '';
          });
          //
          // targetEleEvt.cancelBubble = true;
          targetEleEvt.stopPropagation();
          targetEleEvt.preventDefault();
        });
      });
    return droppedEle2HTML;
  }

  private getRandomNumber() {
    const nums = new Set();
    while (nums.size !== 10) {
      nums.add(Math.floor(Math.random() * 10) + 1);
    }
    return [...nums].join('');
  }
}

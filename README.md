# Setting up a new Angular 4 application
I will start from the beginning. Make sure you have Node.js installed on your machine, follow the instructions here: [https://nodejs.org/en/](https://nodejs.org/en/). When that is done run **.node -v** to test that evverything is up to date. And just in case test so you have the latset version of npm; **.npm -v** otherwise do: **.npm install npm -g**.

Now we are ready to install angular and its packages on your computer:
```
$ npm install -g @angular/cli
```
We are using /cli — due to it being very simple when creating, mananging and building, it automatically creates new projects and some useful commands for continue building in the app. Its easier than to having to do everything manually.

Then create a new project.
```
$ ng new my_new_project
$ cd my_new_project
```

And then to run the server: [http://localhost:4200](http://localhost:4200)

## The Angular 4 app

If you go through your files now, you may see that you have automatically gotten a component and a module.
```
app.component.css
app.component.html
app.component.spec.ts
app.component.ts
app.module.ts
```
The **component** defines the applications logic that supports the view. The component interacts with the view through properties and methods. The Angular application architecture is built up with components. You nest components wihtin each other to make it possible to build single page websites. The **app.component.ts** is our root component.

While the **module** is a container for the different parts in the application — controllers, services, filters and directives for example — which all together will group the whole apps functionality. It’s also where you import necessary dependencies and external modules, and identify the providers and components. Basically it bootstraps the application. In our app the **app.module.ts** is our root module.

And you probably know what the **.html** and **.css** files do. If not, the .html is where you add what you want the view to look like. And the **.css** is what we use to make the tags more beautiful and change the different elements, that have been added to the **.html** file. The **.spec** file we can just ignore — since it has nothing to do with what we are building for the moment.

## Connecting the API to our app

Let me just start by saying, don’t overcomplicate it. Which is easier said than done. When I started creating the front-end, I made 6 new files — hoping to get a response from the back-end. Did it work? No. It should not be that hard I thought after a day. So a project that should actually have taken about an hour, took a day and a half… **One of the reasons I am writing this post, to show you how easy it is**.

So let’s go into our **app.component.ts** file. This will be where we are going to call the API.

We need to make sure that it is imported into the module and identify it as a provider:

Filename - **app.module.ts**
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormModule,
    HttpModule,
    NgbModule
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})

export class AppModule {}
```
Why you may ask. It’s because we will need to expose the API, and only a provider can do that.

Lets import some required libraries for the app to behave as we want.

We need **http**— a class that performs http requests, as well as **response**, when a http request returns, it will emit a response. **.map** helps us manipulate the data, and in this case it we are calling the **.json** method on the response because the actual response is not a collection of data but a JSON string.

Filename - **app.component.ts**
```
import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
});

export class AppComponent{
  title = 'Setting up a new Angular 4 application';
  // Sample Data API url
  private appUrl = 'https://jsonplaceholder.typicode.com/users';
  data: any = {};

  constructor(http:Http){
    console.log('Hello');

    this.getContacts();
    this.getData();
  }

  getData(){
    return this.http.get(this.appUrl)
      .map((res : Response) => res.json());
  }

  getContacts(){
    this.getData().subscribe(data => {
      console.log(data);
      this.data = data;
    });
  }
}
```

Set **apiUrl**

Then lets call the **apiURL** and set it to private. Why are we setting it to private you may ask, it’s because we can call it within this AppComponent class, only. After that we just write a new method (**getData()**) that gets the response from the API. Let’s also set the response to json — so we get the body. We also need to define the method — which we are doing right under the console.log.

After that we need somewhere to store the data — to later on show it in the view. So we need to assign a new variable. We are calling it **data** and setting it to anything right now. After that, a new method that gets the response from the API and **getData()** method that we later on store inside the variable data. **Now we have succesfully connected our Angular app to our back end**. Lets see if it actually works.

## Displaying our data

If you run your server and open your browser. You probably will only see “**app works!**”. But if you look beneath (in other words, open up your console) you might see that we are getting some kind of object.

```
Array [ Object, Object, Object, Object, Object, Object, Object, Object, Object, Object ]
```

Well this obejct actually has our data! Open up the object in the object, and *data (!)* — you now have your data from the API. So how shall we get the data to the view? **Once again, it’s much simpler than you think.**

In Angular 4 there is a directive called **NgFor** — quite helpful actually. This particular directive instantiates a template once per item from an iterable. In other words, it loops through an item from the iterable.

Filename - **app.component.html**
```
<div class="card">
  <ng-container *ngFor="let item of data">
    <h1>{{item.name}}</h1>
    <h2>{{item.username}}</h2>
    <h3>{{item.street + ' ' + item.suite + ' '}}</h3>
    <p>{{item.city}} - {{item.zipcode}}</p>
  </ng-container>
</div>
```
So in our code, we simply assign an attribute (**contacts**) with the data from contacts. **data** is where we stored the response from the API and contacts is what the API has called the arrays. Then we assign all attributes (that the API has) to the **contact**. If anything seems unclear, like the attributes etc. Check what the console has given you. For example in my case, I have an array (**data**) in an array (**contacts**) therefore its **data.contacts** and not just **data**. Same goes for the attributes. The **let contact** however you could name whatever, like **let ebbaisbest**.

Place some style in **app.component.css**
```
.container{
  display:block;
  margin:50px auto;
  width:900px;
}
.card{
  display:block;
  clear:both;
}
.contact-details{
  display: inline-block;
  float: left;
  width: 250px;
  height:200px;
  box-shadow: 2px 6px 7px 5px #cccccc;
  margin: 0 20px 20px 0;
  padding: 10px;
}
.contact-details h1{
  font-size:18px;
}
.contact-details h2{
  font-size:15px;
}
```

## Output

> Leanne Graham

> Bret

> Kulas Light Apt. 556

> Gwenborough - 92998-3874


> Ervin Howell

> Antonette

> Victor Plains Suite 879

> Wisokyburgh - 90566-7771

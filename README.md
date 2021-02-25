This is the VirtualLabs frontend repository. For the backend part refer to
VirtualLabs is the project of the Internet Applications course of the academic year 2019/2020.

## Developers

* [Giuseppe Ognibene](https://github.com/pinoOgni)

* [Alessandro Pagano](https://github.com/alexCodeRider)

* [Hamza Rhaouati](https://github.com/ReddaHawk)

* [Leonardo Tolomei](https://github.com/letol)


## Application launch

1. In the **VirtualLabsFE** folder
2. Give the following commands (to download among other things also the json-server and the json server-auth)
``
npm install
ng serve --open # or npm start
``
The moment library is used to check if a user is logged in or not by checking the presence of the token and its time validity so if it is not installed locally the commands to be executed are
``
npm install
npm i moment
ng serve --open # or npm start
``
3. Open another terminal in the **VirtualLabsFE** directory and issue the following commands:
``
npx json-server-auth virtuallabs.json -r virtuallabs_routes.json
``
4. Open a browser at **https://localhost:4200/**



## Technologies used

 The technologies used are:

* Frontend: Angular
* Backend: Java Spring, the database was made using the MariaDB docker

VirtualLabs is a web application that is used to help teachers and students manage virtual laboratories. In order to use VirtualLabs you must be a student or teacher with an institutional email.

Here is what a teacher can do:

* create, edit, add a course. In the modification of a course he can add one or more teachers, modify the resources of the VMs that each team can have, the minimum and maximum number of students per team

* in the "students" tab you can add and remove one or more students, either choosing from a list or using a csv file

* in the "vms" tab you can see all the teams, in particular the vm of each team and if a vm is running it can also run it, simultaneously with a student.

* in the "assignments" tab you can create an assignment for that course, view the list of homeworks made by students, see the history of homeworks and divide them by status (unread, read, delivered, etc ...). Finally, it can carry out one or more reviews and can also assign a vote.




Here is what a student can do:

* in the tab "teams" can create a team for a given course to which he is enrolled, in practice a proposal for a team, consisting of team name, due date and list of students. The student can also view the list of proposals sent and received by viewing the status of each student for each proposal. If a proposal is accepted by everyone, the student will see her team in the team tab.

* in the "vms" tab he can create one or more instances of a vm for that course, he can turn it off, turn it on, modify it within the limits set by the teacher and obviously he can open it.

* in the "assignments" tab you can view the list of assignments for that course, deliver your own version and view the history of the versions delivered.


A student or teacher has the option to view a person page where basic information and a photo of the account are present.


The most important feature appears when a user types a wrong url. Try it!
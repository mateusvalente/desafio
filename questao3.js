// “Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live”
//
// THIS IS A JAVASCRIPT-LIKE CODE IMPLEMENTING THE SCHEDULING OF BATHS AND VETERINARIANS ON THE PET STORE CASE.
//
// PLEASE REVIEW THIS CODE TO GET IT AS CLEAN AS POSSIBLE. JUSTIFY YOUR CHANGES.
//

//a variavel c é ruim para quem está fazendo a manutenção do código
//c não indica o que é, portando eu mudei para costumerObj
var costumerObj;
var petObj;
var vetObj;

//Implementei algumas classes (Pets, Veterinarian e Persons)

//Troquei o nome da classe para o plural para manter um padrão: objeto no singular, classes no plural
public class Costumers extends Persons {

	//petsIds deve ser recibido como array de ids do referente a cada pet dele, dessa forma não fica limitado a 4 somente
	//também evita que uma série de parametros null seja passada para a função haja um número de pets menor que 4
	constructor(name, address, petsIds, phoneNumber) {

		setName(name);
		setAddress(address);
		setPetIds(petsIds);
		setPhoneNumber(phoneNumber);
	}

	//implementei métodos acessores, uma boa prática em orientação a objeto, permite encapsulamento entre outros benefícios
	public setName(name){
		super(name,name);//this.name estava recebendo altura (height) como parametro e nem é um parametro recebivel pelo construtor
	}

	public getName(){
		return this.name;
	}

	public setAddress(address){
		super(address,address);
	}

	public getAddress(){
		return this.address;
	}

	public setPetIds(petsIds){
		this.petIds = petsIds;
	}

	public getPetIds(){
		return this.petIds;
	}

	//criei um acessor só para adicionar um pet unitário
	public setPetId(petsId){
		this.petIds.push(petsId);
	}


	public setPhoneNumber(phoneNumber){
		super(phoneNumber,phoneNumber);
	}

	public getPhoneNumber(){
		return this.phoneNumber;
	}

	public getCustomer(id) {
		return $http.get('myServer.com/getCustomer?id=' + id);
	}
	static all() {
		return $http.get('myServer.com/returnAllCustomers');
	}
};

//criei o tipo Veterinarian pois é um elemento importante para o sistema
public class Veterinarian extends Persons {

	constructor(name, address, register, phoneNumber) {

		setName(name);
		setAddress(address);
		setRegister(register);
		setPhoneNumber(phoneNumber);

	}

	public setName(name){
		super(name,name);//this.name estava recebendo altura (height) como parametro e nem é um parametro recebivel pelo construtor
	}

	public getName(){
		return this.name;
	}

	public setAddress(address){
		super(address,address);
	}

	public getAddress(){
			return this.address;
	}

	public setRegister(registerregister){
		this.register = register;
	}

	public getRegister(){
		return this.register;
	}

	public setPhoneNumber(phoneNumber){
		super(phoneNumber,phoneNumber);
	}

	public getPhoneNumber(){
		return this.phoneNumber;
	}

	public getVeterinarian(id) {
		return $http.get('myServer.com/getVeterinarian?id=' + id);
	}
	static all() {
		return $http.get('myServer.com/returnAllVeterinarian');
	}
};

//criei uma abstração em que Person pode ser extendida em outras classes com atributos em comum
class Persons {

	constructor(name, address, phoneNumber) {
		this.name = name;
		this.address = address;
		this.phoneNumber = phoneNumber;
	}




}

public class Pets {

	//pet por si só é um objeto, pois pussui vários atributos, e deve pertencer ao costumer
	constructor(name, weight, age, genre) {

		setName(name);
		setWeight(weight);
		setAge(age);
		setGenre(genre);
	}

	public setName(name){
		this.name = name;
	}

	public getName(){
		return this.name;
	}

	public setWeight(weight){
			this.weight = weight;
	}

	public getWeight(){
		return this.weight;
	}

	public setAge(age){
			this.age = age;
	}

	public getAge(){
		return this.age;
	}

	public setGenre(genre){
			this.genre = genre;
	}

	public getGenre(){
		return this.genre;
	}


	public getPet(idPet) {
		return $http.get('myServer.com/getPet?id=' + idPet);
	}
	public getAllPetCostumer(idCostumer) {
		return $http.get('myServer.com/returnAllPetCostumer' + idCostumer);
	}
};


//Troquei os nomes day, hour e duration por day, hour and duration para manter o padrão já que todo o código está em ingles
//Troquei o nome da classe para o plural para manter um padrão: objeto no singular, classes no plural
public class Schedules {

	constructor(day, hour, duration, customerId, type, serviceDescription, otherInfo) {
		setday(day);
		sethour(hour);
		setDuration(duration);
		setCustomerId(customerId);
		setType(type);
		setOtherInfo(otherInfo);
		setServiceDescription(serviceDescription);//Estava faltando este parametro no método construtor
		setResponsable(null);//Implementei o responsável pelo atendimento, no caso veterinário ou dog walker em uma futura implementação
	}

	//implementei métodos acessores, uma boa prática em orientação a objeto, permite encapsulamento entre outros benefícios
	public setDay(day){
		this.day = day;
	}

	public getDay(){
		return this.day;
	}

	public setHour(hour){
		this.hour = hour;
	}

	public getHour(){
		return this.hour;
	}

	public setDuration(duration){
		this.duration = duration;
	}

	public getDuration(){
		return this.duration;
	}

	public setCustomerId(customerId){
		this.customerId = customerId;
	}

	public getCustomerId(){
		return this.customerId;
	}

	public setType(type){
		this.type = type;
	}

	public getType(){
		return this.type;
	}

	public setOtherInfo(otherInfo){
		this.otherInfo = otherInfo;
	}

	public getOtherInfo(){
		return this.otherInfo;
	}

	public setServiceDescription(serviceDescription){
		this.serviceDescription = serviceDescription;
	}

	public getServiceDescription(){
		return this.serviceDescription;
	}

	public setResponsable(responsable){
		this.responsable = responsable;
	}

	public getResponsable(){
		return this.responsable;
	}

	/**
	 * WARNING: don't change this method because it's been used in another places
	 * @return {[type]} [description]
	 */
	public saveSchedule() {
		return $http.post('myServer.com/saveSchedule', this);
	}

	//Criei estas duas funções para manter o Open Closed Principle - OCP, mantemos a função saveSchedule extendida mas não modificável
	//permite que façomos tarefas diferentes conforme o tipo de agenda
	public saveScheduleVeterinarian(veterinarian){
			//podemos por qualquer codigo aqui, depois chamar a função mais genérica
			setResponsable(veterinarian);
			saveSchedule();
	}

	public saveScheduleBath(){
			//podemos por qualquer codigo aqui, depois chamar a função mais genérica
			saveSchedule();
	}
};


//Scheduling baths
//petNames[0] sempre iria gravar o nome do primeiro pet da lista, ou seja se fosse outro pet não gravaria corretamente
//Recebendo o Id do pet e buscando seus atributos permite gravar o nome do pet corretamente
function scheduleBath(day, hour, duration, customerId, petId) {
	costumerObj = Customers.getCustomer(customerId);
	petObj = Pets.getPetCustomer(petId)//busca os atributos de determinado pet

	//implementei esta variável pois o return estava sendo usado mais de uma vez nesta função
	//isso gera alguns problemas, por exemplo se dois return forem usados na mesma instancia da função
	var returnVar = null;


	try {
		//Mudei a variavel s para scheduleObj para ajudar quem irá dar manutenção neste sistema, pois s é muito genérico.
		Schedules scheduleObj = new Schedule(day, hour, duration, customerId, "BANHO", "Dono(a): " + costumerObj.name + ". Nome do pet: " + petObj.name);
		scheduleObj.saveScheduleBath();
		returnVar = "Agendamento realizado";
	} catch (Exception error) { //é dificil identificar s para quem está dando manutenção, mudei para error
		returnVar = "Agendamento deu erro. " + error.printStackTrace();
	}
	return returnVar;
}

//Scheduling veterinarian
//petNames[0] sempre iria gravar o nome do primeiro pet da lista, ou seja se fosse outro pet não gravaria corretamente
//Recebendo o Id do pet e buscando seus atributos permite gravar o nome do pet corretamente
//Tamém implementei o veterinarian para coloca-lo como responsável pelo atendimento agendado, nesse caso veterinarianId é recebido como parametro
function scheduleVeterinarian(day, hour, duration, customerId, petId, veterinarianId) {
	costumerObj = Customers.getCustomer(customerId);
	petObj = Pets.getPetCustomer(petId);//busca os atributos de determinado pet

	//implementei esta variável pois o return estava sendo usado mais de uma vez nesta função
	//isso gera alguns problemas, por exemplo se dois return forem usados na mesma instancia da função
	var returnVar = null;

	try {
		//Mudei a variavel s para scheduleObj para ajudar quem irá dar manutenção neste sistema, pois s é muito genérico.
		Schedules scheduleObj = new Schedule(day, hour, duration, customerId, "VETERINÁRIO", "Dono(a): " + costumerObj.name + ". Nome do pet: " + petObj.name);
		scheduleObj.saveScheduleVeterinarian(veterinarianId);
		returnVar = "Agendamento realizado";
	} catch (Exception error) {//é dificil identificar s para quem está dando manutenção, mudei para error
		returnVar = "Agendamento deu erro. " + error.printStackTrace();
	}
	return returnVar;
}

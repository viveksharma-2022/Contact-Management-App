import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { IContacts } from '../../Models/Contact';
import { ContactServicesService } from '../../Service/contact-services.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-get-contacts',
  
  templateUrl: './get-contacts.component.html',
  styleUrl: './get-contacts.component.css'
})
export class GetContactsComponent {

  @ViewChild('myModal') model: ElementRef | undefined;

  contactForm:FormGroup= new FormGroup({});
  pages: number = 1;
  searchedKeyword :any ='';
  contactlist:IContacts[]=[];
  submitted=false;

  constructor(private contactService: ContactServicesService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.setFormState();
    this.getContacts();
  }

  openModal()
  {
    const contactModal= document.getElementById('myModal');
    if(contactModal!=null)
    {
      contactModal.style.display='block';
    }
  }

  closeModal()
  {
    this.setFormState();
    if(this.model!=null)
    {
      this.model.nativeElement.style.display='none';
    }

  }

  getContacts(){
    this.contactService.getContacts().subscribe((res)=>{
      this.contactlist=res;
    })
  }
  get contactdata(): { [key: string]: AbstractControl } {
    return this.contactForm.controls;
  }

  setFormState(){
    this.contactForm= this.fb.group({
      id:[0],
      firstName:['', [Validators.required]],
      lastName:['', [Validators.required]],
      eMail:['',[Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    })
  }

  formValues:any;
  onSubmit()
  {
    this.submitted = true;
    if(this.contactForm.invalid){
      alert('Please Fill All Fields!')
      return;
    }
    if(this.contactForm.value.id==0)
    {
      this.formValues=this.contactForm.value;
      this.contactService.createContact(this.formValues).subscribe((res)=>{
      alert('Contact Added Successfully!');
      this.getContacts();
      this.contactForm.reset();
      this.closeModal();

    });
    }
    else{
      this.formValues=this.contactForm.value;
      this.contactService.updateContact(this.formValues.id,this.formValues).subscribe((res)=>{
      alert('Contact Updated Successfully!');
      this.getContacts();
      this.contactForm.reset();
      this.closeModal();

    });
    }
    
  }
  onEdit(contact :IContacts){
    this.openModal();
    this.contactForm.patchValue(contact);
  }
  onDelete(id:number){
    const isConfirm=confirm('Are you Sure You Want To Delete?');
    if(isConfirm)
    {
      this.contactService.deleteContact(id).subscribe((res)=>{
        alert("Contact Deleted Successfully!");
        this.getContacts();
      })
    }
    
  }
}

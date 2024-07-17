import {Component, OnInit} from '@angular/core';
import {ContactService} from "../../Services/contact.service";
import {NgForm} from "@angular/forms";
import {ContactDto} from "../../Model/ContactDto";
import Swal from "sweetalert2";

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent implements OnInit {
  username: string; // Assuming you get the username from somewhere

  constructor(private contactService: ContactService) {
    // Initialize username here or fetch it from service
    this.username = ''; // Initialize with actual username if available
  }

  ngOnInit(): void {
  }

  onSubmitContact(contactForm: NgForm) {
    if (contactForm.valid) {
      const contactDto = new ContactDto(
        contactForm.value.nomPrenom,
        contactForm.value.numeroCompte,
        this.username
      );

      this.contactService.createContact(contactDto).subscribe(
        response => {
          console.log('Contact created successfully', response);
          contactForm.resetForm();
          Swal.fire({
            title: 'Parfait!',
            text: 'Contact créé avec succès',
            icon: 'success'
          });
        },
        error => {
          console.error('Error creating contact', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error || 'An error occurred while creating the contact'
          });
        }
      );
    }
  }

}

import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/AuthService.service';
import { IUser } from '../../core/interfaces/Authentication/IUser';
import { OrganizationService } from '../../core/services/Organization.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrganization } from '../../core/interfaces/IOrganization';

@Component({
  selector: 'app-create-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class OrganizationComponent implements OnInit {
  form!: FormGroup;
  currentStep = 1;
  isLoading = false;
  selectedImage: string | null = null;
  imageFile: File | null = null;
  userImage!: string;
  fullName!: string;
  org!: IOrganization | null;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private organizationService: OrganizationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
    this.subscribeToUser();
    this.generateSlugFromName();
    this.org = this.route.snapshot.data['organization'];
    console.log(this.org);
    if (this.org && this.org.slug) {
      this.router.navigate(['/dashboard']);
    }

  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      slug: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9]+(?:-[a-z0-9]+)*$'),
          Validators.minLength(3),
          Validators.maxLength(30)
        ]
      ],
      type: ['business'],
      image: [null]
    });
  }

  private subscribeToUser(): void {
    this.auth.currentUser$.subscribe((user: IUser | null) => {
      if (user) {
        this.userImage = user.profileImage;
        this.fullName = user.fullName;
      }
    });
  }

  private generateSlugFromName(): void {
    this.form.get('name')?.valueChanges.subscribe((val: string) => {
      const slug = (val || '')
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .substring(0, 30);
      this.form.get('slug')?.setValue(slug, { emitEvent: false });
    });
  }

  get f() {
    return this.form.controls;
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.imageFile = file;
      this.form.patchValue({ image: this.imageFile });

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
        console.log(this.selectedImage);
      };
      reader.readAsDataURL(file);
    }
  }


  submit(): void {
    console.log(this.form.value);
    if (this.form.invalid || !this.imageFile) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const formData = new FormData();
    formData.append('Name', this.f['name'].value);
    formData.append('Slug', this.f['slug'].value);
    formData.append('Type', this.f['type'].value);
    formData.append('image', this.imageFile);

    this.organizationService.createOrganization(formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log('Created:', res);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error:', err);
      }
    });
  }
}


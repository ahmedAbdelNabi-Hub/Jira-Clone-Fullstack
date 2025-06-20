import { FormGroup } from '@angular/forms';

export function getErrorMessage(form: FormGroup, controlName: string): string | null {
    const control = form.get(controlName);
    if (!control?.touched || !control.errors) {
        return null;
    }

    const errors = control.errors;

    if (errors['required']) {
        return `${controlName} is required.`;
    }
    if (errors['min']) {
        return `${controlName} must be greater than the minimum allowed value.`;
    }
    if (errors['max']) {
        return `${controlName} must be less than the maximum allowed value.`;
    }
    if (errors['minlength']) {
        return `${controlName} must be at least ${errors['minlength'].requiredLength} characters long.`;
    }
    if (errors['maxlength']) {
        return `${controlName} cannot exceed ${errors['maxlength'].requiredLength} characters.`;
    }
    if (errors['pattern']) {
        return `${controlName} format is invalid.`;
    }
    if (errors['positiveNumber']) {
        return `${controlName} must be a positive number.`;
    }
    if (errors['requiredFile']) {
        return 'An image file is required.';
    }
    if (errors['email']) {
        return 'Invalid email format';
    }

    return null; // No error
}

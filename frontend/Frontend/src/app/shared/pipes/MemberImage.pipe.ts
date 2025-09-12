import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'memberImage'
})
export class MemberImagePipe implements PipeTransform {
    transform(image: string | null | undefined): string {
        if (!image) {
            return 'assets/default-avatar.png';
        }

        if (image.startsWith('http')) {
            return image;
        }

        return `https://localhost:7182/image/profile/${image}`;
    }
}
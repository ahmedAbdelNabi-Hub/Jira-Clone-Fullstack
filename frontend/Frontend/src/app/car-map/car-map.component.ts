import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-car-map',
  templateUrl: './car-map.component.html',
  styleUrls: ['./car-map.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class CarMapComponent implements OnInit {
  private isBrowser: boolean;
  private L: any;
  private map: any;
  private carMarker: any;
  private intervalId: any;

  public start: any;
  public searchQuery: string = '';
  public suggestions: any[] = [];

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  async ngOnInit() {
    if (!this.isBrowser) return;

    this.L = await import('leaflet');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.start = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.initMap();
        this.addCarMarker();
      },
      () => {
        alert('⚠️ Location denied. Using default Cairo location.');
        this.start = { lat: 30.0444, lng: 31.2357 };
        this.initMap();
        this.addCarMarker();
      }
    );
  }

  initMap() {
    this.map = this.L.map('map').setView(this.start, 13);
    this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © OpenStreetMap contributors',
    }).addTo(this.map);

    // ✅ Enable click to move
    this.map.on('click', (e: any) => {
      const destination = {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      };

      this.searchQuery = `Lat: ${destination.lat.toFixed(5)}, Lng: ${destination.lng.toFixed(5)}`;
      this.moveCar(this.start, destination, 10000);
    });
  }

  addCarMarker() {
    const carIcon = this.L.divIcon({
      html: `
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#e60000" viewBox="0 0 24 24">
          <path d="M18.92 6.01A1.992 1.992 0 0 0 17.17 5H6.83a1.992 1.992 0 0 0-1.75 1.01L3 9v10a1 1 0 0 0 1 1h1a2 2 0 0 0 4 0h6a2 2 0 0 0 4 0h1a1 1 0 0 0 1-1V9l-1.08-2.99zM6.5 17A1.5 1.5 0 1 1 8 15.5 1.5 1.5 0 0 1 6.5 17zm11 0A1.5 1.5 0 1 1 19 15.5 1.5 1.5 0 0 1 17.5 17zM5 10l1.5-3h11L19 10H5z"/>
        </svg>`,
      iconSize: [36, 36],
      className: 'car-icon',
    });

    this.carMarker = this.L.marker(this.start, { icon: carIcon }).addTo(this.map);
  }

  moveCar(start: any, end: any, duration: number) {
    if (this.intervalId) clearInterval(this.intervalId);

    const steps = 100;
    const latStep = (end.lat - start.lat) / steps;
    const lngStep = (end.lng - start.lng) / steps;
    let step = 0;
    const intervalTime = duration / steps;
    const startTime = performance.now();

    this.intervalId = setInterval(() => {
      if (step >= steps) {
        clearInterval(this.intervalId);
        const endTime = performance.now();
        const totalSeconds = ((endTime - startTime) / 1000).toFixed(2);
        const distance = this.getDistance(start.lat, start.lng, end.lat, end.lng);
        alert(`📍 Arrived\n🛣 ${distance.toFixed(2)} km\n⏱ ${totalSeconds} s`);
        this.start = end; // ✅ Update position
        return;
      }

      const lat = start.lat + latStep * step;
      const lng = start.lng + lngStep * step;
      this.carMarker.setLatLng([lat, lng]);
      this.map.setView([lat, lng]);
      step++;
    }, intervalTime);
  }

  fetchSuggestions() {
    if (this.searchQuery.trim().length < 3) {
      this.suggestions = [];
      return;
    }

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.searchQuery + ', Egypt')}`)
      .then(res => res.json())
      .then(data => {
        this.suggestions = data;
      })
      .catch(() => {
        this.suggestions = [];
      });
  }

  selectSuggestion(suggestion: any) {
    this.suggestions = [];
    this.searchQuery = suggestion.display_name;

    const destination = {
      lat: parseFloat(suggestion.lat),
      lng: parseFloat(suggestion.lon)
    };

    this.moveCar(this.start, destination, 10000);
  }

  getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}

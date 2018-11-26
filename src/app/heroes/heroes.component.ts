import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
 
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  public searchText : string;
  public customerData : any;
  arrCase : object [];
  games : object [];
  heroes = HEROES;
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };
  
	selectedHero: Hero;
	onSelect(hero: Hero): void {
	  this.selectedHero = hero;
	}
 
  constructor(private httpService: HttpClient) { }
 
  ngOnInit() {
    this.httpService.get('./assets/fileJson.json').subscribe(
        data => {
          let res = data[0];
          console.log(res);
          console.log('leg: '+data.length);   
         for(var i=0;i<data.length;i++)
         {
            let res = data[i];   
            console.log('Data =  '+JSON.stringify(res));
            //let nid = 21+i;
            let nid=i;
            let title = data[i]['title'];
            let maxsize = 45;
            title = title.substring(0,title.length>maxsize?maxsize:title.length);
            this.heroes.push({id:nid,name:title});
         }

          /*this.Drugs = res['Drugs']; 
          console.log(this.Drugs);

          console.log(this.Drugs[0]['DrugName']);        
          console.log(this.Drugs[0]['Dosage']);
          console.log(this.Drugs[0]['MedicationDuration']);
          console.log(this.Drugs[0]['MedicationType']);

          console.log(this.Drugs[1]['DrugName']);        
          console.log(this.Drugs[1]['Dosage']);
          console.log(this.Drugs[1]['MedicationDuration']);
          console.log(this.Drugs[1]['MedicationType']);
          */
        },
        (err: HttpErrorResponse) => {
          console.log (err.message);
        }
      );
  }
 
}
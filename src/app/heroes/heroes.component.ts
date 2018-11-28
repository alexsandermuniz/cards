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
    name: 'Windstorm',
    de: 0,
    por: 0,
    dehist: '',
    porhist: '',
    dischist: '',
    discount: -10
  };
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2006', '2007'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [28, 38], label: 'Series A'},
    {data: [28, 38], label: 'Series B'},
    {data: [28, 38], label: 'Series C'}
  ];
  
  selectedHero: Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;

    let dehist = hero.dehist.split("##");
    let dehistnum = [];
    let porhist = hero.porhist.split("##");
    let porhistnum = [];
    let dischist = hero.dischist.split("##");
    console.log('Dischist = '+dischist);
    let dischistnum = [];
    let labels = [];
    for(var i=0;i<dehist.length;i++)
    {
      dehistnum.push(dehist[i].replace(',','.'));
    }
    for(var i=0;i<porhist.length;i++)
    {
      porhistnum.push(porhist[i].replace(',','.')));
    }
    for(var i=0;i<dischist.length;i++)
    {
      dischistnum.push(dischist[i].replace('%','').replace(',','.')*-1);
    }
    console.log('De: '+JSON.stringify(dehistnum));
    console.log('Por: '+JSON.stringify(porhistnum));
    console.log('Disc: '+JSON.stringify(dischistnum));

    this.barChartLabels = labels;
    this.barChartData = [
      {data: dehistnum, label: 'De'},
      {data: porhistnum, label: 'Por'},
      {data: dischistnum, label: 'Disc'}
    ];
  }
 
  constructor(private httpService: HttpClient) { }
 
  ngOnInit() {
    this.httpService.get('./assets/filejson1.json').subscribe(
        data => {
          let res = data[0];
          console.log(res);
          console.log('leg: '+(<any>data).length);   
         for(var i=0;i<(<any>data).length;i++)
         {
            let res = data[i];   
            //console.log('Data =  '+JSON.stringify(res));
            //let nid = 21+i;
            let nid=i;
            let title = data[i]['title'];
            let maxsize = 40;
            title = title.substring(0,title.length>maxsize?maxsize:title.length);
            let disc = data[i]['discount'].replace('%','');
            
            let de = data[i]['de'];
            let por = data[i]['por'];

            de = de.replace(',','.');
            por = por.replace(',','.');

            let deh = de;
            let porh = por;
            let disch = disc; 

            let aux = de.split('##');
            //console.log('Aux size = '+aux.length);
            if(aux.length>1)
            {
               de = aux[aux.length-1];
                aux = por.split('##');
                por = aux[aux.length-1];
                aux = disc.split('##');
                disc = aux[aux.length-1];              
            }



            this.heroes.push({id:nid,name:title,de:de,por:por,discount:disc,dehist: deh, porhist: porh, dischist: disch});
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
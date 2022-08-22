import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

// import { AccountService } from '../_services';
import { TournamentService, AlertService } from '../_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    tournaments = [];
    // tournamentNull : boolean;

    constructor(
        private tournamentService: TournamentService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.tournamentService.getAll()
            .pipe(first())
            .subscribe(tournaments => this.tournaments = tournaments);

        //if data tournaments null
        // console.log(this.tournaments)
        // if(this.tournaments == null){
        //     this.tournamentNull = true
        // }
    }

    deleteTournament(id: string) {
        //delete data when klik ok
        if(confirm("Do you want to delete this data ?")){
            const tournament = this.tournaments.find(x => x.id === id);
            tournament.isDeleting = true;
            this.tournamentService.delete(id)
                .pipe(first())
                // .subscribe(() => this.tournaments = this.tournaments.filter(x => x.id !== id));
                .subscribe({
                    next: () => {
                        this.tournaments = this.tournaments.filter(x => x.id !== id)
                        this.alertService.clear()
                        this.alertService.success('Delete successfully', { keepAfterRouteChange: false });
                    }
                });
        }
    }
}
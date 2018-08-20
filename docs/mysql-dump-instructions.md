# How to download your data?

If your experiment is saving data on a LabointheWild database, a member of the LabinthWild
team will create a url that you can visit to download your up-to-date data from the
experiment. Each line in the database represents one call The data will be in csv form, with three fields: 

1) An ID, this is just an index for the database 
2) study_data, which is a JSON field that stores all the information from the study. 
3) A timestamp

Although each line of study_data might contain different keys (e.g., one line might be a 
checkpoint save while the next could be the results of a trial.) every line will contain a 
unique id, called 'uuid', corresponding to the participant that line's data refers to.

The LabintheWild team has code for parsing this csv file into dataframes 
for both python and R.

If you are part of the LabintheWild team, here are the steps for setting up the csv dump 
service for a new study: 

1) ssh into the tmp server 

 ``ssh tmpaccount@labinthewild.org`` 


2) navigate to the homepage using ``wd``

3) Navigate to the data dump folder ``cd data/litw-sqldump/``

4) Here you will find folders for each project that you can dump data. To make a new folder
copy the test folder ``cp -R test new_project``

5) ``dump.sh`` currently connects to the tmp database using the line 
``mysql -h35.203.191.91 -utmp_litw -p$1 tmp_litw_studies``
Change this line to connect to the study's database instead.

6) Change the .csv and .tgz files to names for your project, both in the directory AND in the
dump.sh file

7) Run dump.sh ``./dump.sh`` make sure to enter the correct password.

8) Go to the URL  'http://tmp12345.labinthewild.org/data/litw-sqldump/YOUR_PROJECT/YOUR_PROJECT.csv'
to download the csv file, or 'http://tmp12345.labinthewild.org/data/litw-sqldump/YOUR_PROJECT/YOUR_PROJECT.csv.tgz' for the zipped file.

 
